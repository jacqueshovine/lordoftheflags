import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { shuffle } from '@/utils/helpers';
import countries from '@/data/countries.json';
import classicMode from '@/modes/classic.js';
import timerMode from '@/modes/timer.js';

export const useGameStore = defineStore('game', () => {
  // ========================================================================================================================
  // STATE -- State = Data (Variables)
  // ========================================================================================================================
  const modes = { classic: classicMode, timer: timerMode };
  const currentMode = ref(classicMode);
  const gameRunning = ref(false);
  const timer = ref(null);
  const currentFilter = ref(null);
  const shuffledCountries = ref([]);
  const roundsLeft = ref(0);
  const currentScore = ref(0);
  const selectedAnswer = ref(null);
  const countryToGuess = ref(null);
  const countryPossibilities = ref([]);
  const currentRound = ref(0);
  
  // Scores organized by mode, then by region (initialized dynamically in setMode)
  const maxAchievedScores = ref({});

  // ========================================================================================================================
  // GETTERS -- Computed/Derived Values (Read-only)
  // ========================================================================================================================
  const getRegions = computed(() => currentMode.value?.regions || []);

  const getFilteredCountries = computed(() => {
    if (currentFilter.value) {
      return countries.filter(country => country.continent === currentFilter.value);
    }
    return countries;
  });

  const getRegionScores = computed(() => {
    const scores = {};
    const modeId = currentMode.value?.id;
    
    getRegions.value.forEach(region => {
      const maxPossible = region === 'World' 
        ? countries.length
        : countries.filter(c => c.continent === region).length;
      
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

  const getTotalRounds = computed(() => getFilteredCountries.value.length);

  const getCurrentRound = computed(() => {
    return currentMode.value.id === 'classic' ? getTotalRounds.value - roundsLeft.value : currentRound.value;
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
    shuffledCountries.value = shuffle([...getFilteredCountries.value]);
    gameRunning.value = true;
    currentScore.value = 0;
    currentRound.value = 0;

    // If timer mode, rounds are infinite until the timer runs out
    if (currentMode.value?.hasTimer) {
      roundsLeft.value = Infinity;
      timer.value = setTimeout(() => {
        console.log('Time over'); // Remove when able to display timer
        endGame();
      }, currentMode.value.timerDuration * 1000);
    // Otherwise, set rounds to the number of countries in the filtered list
    } else {
      roundsLeft.value = shuffledCountries.value.length;
    }

    nextRound();
  }

  function nextRound() {
    if (roundsLeft.value <= 0) {
      endGame();
      return;
    }

    if (currentMode.value.hasTimer) {
      currentRound.value++;
      const randomIndex = Math.floor(Math.random() * shuffledCountries.value.length);
      countryToGuess.value = shuffledCountries.value[randomIndex];
    } else {
      const currentIndex = shuffledCountries.value.length - roundsLeft.value;
      countryToGuess.value = shuffledCountries.value[currentIndex];
      roundsLeft.value--;
    }

    // Get 3 wrong answers
    let countryList = shuffle([...getFilteredCountries.value]);
    const wrongCountries = countryList
      .filter(country => country.code !== countryToGuess.value.code)
      .slice(0, 3);

    // Combine correct answer with wrong answers and shuffle
    countryPossibilities.value = shuffle([
      countryToGuess.value,
      ...wrongCountries,
    ]);
  }

  function checkAnswer(selectedCountry) {
    selectedAnswer.value = selectedCountry.code;
    
    if (selectedCountry.code === countryToGuess.value.code) {
      currentScore.value++;
    }
    
    const delay = currentMode.value?.feedbackDelay || 1500;
    setTimeout(() => {
      selectedAnswer.value = null;
      nextRound();
    }, delay);
  }

  function endGame() {
    gameRunning.value = false;
    
    // Update the max score for the current mode and region
    const modeId = currentMode.value?.id;
    const region = getCurrentRegion.value;
    
    if (modeId && currentScore.value > maxAchievedScores.value[modeId][region]) {
      maxAchievedScores.value[modeId][region] = currentScore.value;
    }
    
    currentScore.value = 0;
  }

  function resetGame() {
    if (timer.value) {
      clearTimeout(timer.value);
      timer.value = null;
    }
    gameRunning.value = false;
    currentRound.value = 0;
    currentFilter.value = null;
    shuffledCountries.value = [];
    roundsLeft.value = 0;
    currentScore.value = 0;
    selectedAnswer.value = null;
    countryToGuess.value = null;
    countryPossibilities.value = [];
  }

  return {
    // State
    modes,
    currentMode,
    gameRunning,
    currentFilter,
    roundsLeft,
    currentScore,
    selectedAnswer,
    countryToGuess,
    countryPossibilities,
    maxAchievedScores,
    
    // Getters
    getRegions,
    getFilteredCountries,
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
