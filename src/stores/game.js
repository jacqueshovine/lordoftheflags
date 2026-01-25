import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { shuffle } from '@/utils/helpers';
import flags from '@/data/countries.json';
import classicMode from '@/modes/classic.js';
import timerMode from '@/modes/timer.js';

export const useGameStore = defineStore('game', () => {
  // ========================================================================================================================
  // STATE -- State = Data (Variables)
  // ========================================================================================================================
  const modes = { classic: classicMode, timer: timerMode };
  const currentMode = ref(classicMode);
  const gameRunning = ref(false);
  const gameEnding = ref(false);
  const timer = ref(null);
  const currentFilter = ref(null);
  const shuffledFlags = ref([]);
  const roundsLeft = ref(0);
  const currentScore = ref(0);
  const selectedAnswer = ref(null);
  const flagToGuess = ref(null);
  const flagPossibilities = ref([]);
  const roundCount = ref(0);
  
  // Scores organized by mode, then by region (initialized dynamically in setMode)
  const maxAchievedScores = ref({});

  // ========================================================================================================================
  // GETTERS -- Computed/Derived Values (Read-only)
  // ========================================================================================================================
  const getRegions = computed(() => currentMode.value?.regions || []);

  const getFilteredFlags = computed(() => {
    if (currentFilter.value) {
      return flags.filter(flag => flag.continent === currentFilter.value);
    }
    return flags;
  });

  const getRegionScores = computed(() => {
    const scores = {};
    const modeId = currentMode.value?.id;
    
    getRegions.value.forEach(region => {
      const maxPossible = region === 'World' 
        ? flags.length
        : flags.filter(f => f.continent === region).length;
      
      scores[region] = {
        maxPossible,
        maxAchieved: maxAchievedScores.value[modeId]?.[region] || 0
      };
    });
    
    return scores;
  });

  const getCurrentRegion = computed(() => currentFilter.value || 'World');

  const getCurrentMaxScore = computed(() => {
    return getRegionScores.value[getCurrentRegion.value]?.maxAchieved || 0;
  });

  const getTotalRounds = computed(() => getFilteredFlags.value.length);

  const getCurrentRound = computed(() => {
    return currentMode.value.getCurrentRound(getTotalRounds.value, roundsLeft.value, roundCount.value);
  });

  // ========================================================================================================================
  // ACTIONS -- Methods : Write (Functions that can modify state)
  // ========================================================================================================================
  function setMode(mode) {
    currentMode.value = mode;
    
    // Initialize scores for this mode if they don't exist
    if (!maxAchievedScores.value[mode.id]) {
      // The object will look like: { 'World': 0, 'Africa': 0, ... }
      maxAchievedScores.value[mode.id] = Object.fromEntries(
        mode.regions.map(region => [region, 0])
      );
    }
  }

  function initGame(filter = null) {
    currentFilter.value = filter;
    shuffledFlags.value = shuffle([...getFilteredFlags.value]);
    gameRunning.value = true;
    currentScore.value = 0;
    roundCount.value = 0;

    // Let the mode decide how many rounds
    roundsLeft.value = currentMode.value.initRounds(shuffledFlags.value.length);

    // Start timer if mode uses one
    if (currentMode.value.hasTimer) {
      timer.value = setTimeout(() => {
        console.log('Time over'); // Remove when able to display timer
        endGame();
      }, currentMode.value.timerDuration * 1000);
    }

    nextRound();
  }

  function nextRound() {
    if (roundsLeft.value <= 0) {
      endGame();
      return;
    }

    // Pick the next flag to guess
    const currentIndex = shuffledFlags.value.length - roundsLeft.value;
    flagToGuess.value = currentMode.value.pickNextFlag(shuffledFlags.value, currentIndex, flagToGuess.value);
    
    // Update round tracking
    roundCount.value++;
    if (roundsLeft.value !== Infinity) {
      roundsLeft.value--;
    }

    // Get wrong answers based on mode setting
    const wrongCount = currentMode.value.wrongAnswersCount || 3;
    let flagList = shuffle([...getFilteredFlags.value]);
    const wrongFlags = flagList
      .filter(flag => flag.code !== flagToGuess.value.code)
      .slice(0, wrongCount);

    // Combine correct answer with wrong answers and shuffle
    flagPossibilities.value = shuffle([
      flagToGuess.value,
      ...wrongFlags,
    ]);
  }

  function checkAnswer(selectedFlag) {
    selectedAnswer.value = selectedFlag.code;
    
    if (selectedFlag.code === flagToGuess.value.code) {
      currentScore.value++;
    }
    
    const delay = currentMode.value?.feedbackDelay || 1500;
    setTimeout(() => {
      selectedAnswer.value = null;
      nextRound();
    }, delay);
  }

  function endGame() {
    // Clear timer if running
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
    
    gameEnding.value = true;
  }

  function resetGame(playAgain = false) {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }

    // Update the max score for the current mode and region
    const modeId = currentMode.value?.id;
    const region = getCurrentRegion.value;
    
    if (modeId && currentScore.value > maxAchievedScores.value[modeId][region]) {
      maxAchievedScores.value[modeId][region] = currentScore.value;
    }
    
    currentScore.value = 0;
    gameRunning.value = false;
    gameEnding.value = false;
    roundCount.value = 0;
    shuffledFlags.value = [];
    roundsLeft.value = 0;
    currentScore.value = 0;
    selectedAnswer.value = null;
    flagToGuess.value = null;
    flagPossibilities.value = [];

    if (playAgain) {
      initGame(currentFilter.value);
    } else {
      currentFilter.value = null;
    }
  }

  // Initialize default mode's scores on store setup
  setMode(classicMode);

  return {
    // State
    modes,
    currentMode,
    gameRunning,
    gameEnding,
    currentFilter,
    roundsLeft,
    currentScore,
    selectedAnswer,
    flagToGuess,
    flagPossibilities,
    maxAchievedScores,
    
    // Getters
    getRegions,
    getFilteredFlags,
    getRegionScores,
    getCurrentRegion,
    getCurrentMaxScore,
    getTotalRounds,
    getCurrentRound,
    
    // Actions
    setMode,
    initGame,
    nextRound,
    checkAnswer,
    endGame,
    resetGame
  };
});
