import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { shuffle } from '@/utils/helpers';
import countries from '@/data/countries.json';

export const useGameStore = defineStore('game', () => {
  // State
  const gameRunning = ref(false);
  const currentFilter = ref(null);
  const shuffledCountries = ref([]);
  const roundsLeft = ref(0);
  const currentScore = ref(0);
  const selectedAnswer = ref(null);
  const countryToGuess = ref(null);
  const countryPossibilities = ref([]);
  
  const maxAchievedScores = ref({
    World: 0,
    Africa: 0,
    America: 0,
    Asia: 0,
    Europe: 0,
    Oceania: 0
  });

  const regions = ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];

  // Getters
  const filteredCountries = computed(() => {
    if (currentFilter.value) {
      return countries.filter(country => country.continent === currentFilter.value);
    }
    return countries;
  });

  const regionScores = computed(() => {
    const scores = {};
    
    regions.forEach(region => {
      const maxPossible = region === 'World' 
        ? countries.length
        : countries.filter(c => c.continent === region).length;
      
      scores[region] = {
        maxPossible,
        maxAchieved: maxAchievedScores.value[region]
      };
    });
    
    return scores;
  });

  const currentRegion = computed(() => currentFilter.value || 'World');

  const currentMaxScore = computed(() => {
    return regionScores.value[currentRegion.value]?.maxAchieved || 0;
  });

  // Actions
  function initGame(filter = null) {
    currentFilter.value = filter;
    shuffledCountries.value = shuffle([...filteredCountries.value]);
    gameRunning.value = true;
    currentScore.value = 0;
    roundsLeft.value = shuffledCountries.value.length;
    nextRound();
  }

  function nextRound() {
    if (roundsLeft.value <= 0) {
      endGame();
      return;
    }

    const currentIndex = shuffledCountries.value.length - roundsLeft.value;
    countryToGuess.value = shuffledCountries.value[currentIndex];
    roundsLeft.value--;

    // Get 3 wrong answers
    let countryList = shuffle([...filteredCountries.value]);
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
    
    setTimeout(() => {
      selectedAnswer.value = null;
      nextRound();
    }, 1500);
  }

  function endGame() {
    gameRunning.value = false;
    
    // Update the max score for the current region
    const region = currentRegion.value;
    if (currentScore.value > maxAchievedScores.value[region]) {
      maxAchievedScores.value[region] = currentScore.value;
    }
    
    currentScore.value = 0;
  }

  function resetGame() {
    gameRunning.value = false;
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
    gameRunning,
    currentFilter,
    roundsLeft,
    currentScore,
    selectedAnswer,
    countryToGuess,
    countryPossibilities,
    maxAchievedScores,
    regions,
    
    // Getters
    filteredCountries,
    regionScores,
    currentRegion,
    currentMaxScore,
    
    // Actions
    initGame,
    nextRound,
    checkAnswer,
    endGame,
    resetGame
  };
});
