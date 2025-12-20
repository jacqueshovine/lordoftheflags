<script setup>
import { computed, ref } from 'vue';
import { shuffle } from '../utils';

import FlagGrid from '../components/FlagGrid.vue';
import ScoreDisplay from '../components/ScoreDisplay.vue';
import GameQuestion from '../components/GameQuestion.vue';
import ButtonWithScore from '../components/ButtonWithScore.vue';

const props = defineProps({
  countries: Array
});

const countries = computed(() => {
    if (currentFilter.value) {
        return props.countries.filter(country => country.continent === currentFilter.value);
    }
    return props.countries || [];
});

const gameRunning = ref(false);
const roundsLeft = ref(0);
const currentFilter = ref(null);

const currentScore = ref(0);
const maxAchievedScores = ref({
    World: 0,
    Africa: 0,
    America: 0,
    Asia: 0,
    Europe: 0,
    Oceania: 0
});
const regions = ['World', 'Africa', 'America', 'Asia', 'Europe', 'Oceania'];
const regionScores = computed(() => {
    const scores = {};
    
    regions.forEach(region => {
        const maxPossible = region === 'World' 
            ? props.countries?.length || 0
            : props.countries?.filter(c => c.continent === region).length || 0;
        
        scores[region] = {
            maxPossible,
            maxAchieved: maxAchievedScores.value[region]
        };
    });
    
    return scores;
});

const countryToGuess = ref('');
const countryPossibilities = ref([]);
const selectedAnswer = ref(null);

function initGame(filter = null) {
    // Filter countries based on the selected region if provided
    currentFilter.value = filter;

    // Shuffle the countries array to randomize the order every time
    countries.value = shuffle(countries.value);
    gameRunning.value = true;
    roundsLeft.value = countries.value.length;
    nextRound();
}

function nextRound() {
    if (roundsLeft.value <= 0) {
        endGame();
        return;
    }

    countryToGuess.value = countries.value[countries.value.length - roundsLeft.value];
    roundsLeft.value--;

    let countryList = [...countries.value]; // creating a copy that we can shuffle without mutating the original country array
    countryList = shuffle(countryList);

    const wrongCountries = countryList
            .filter(country => country.code !== countryToGuess.value.code) // Exclude the correct country
            .slice(0, 3);

    countryPossibilities.value = shuffle([
        countryToGuess.value, // The right answer
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
    const region = currentFilter.value || 'World';
    if (currentScore.value > maxAchievedScores.value[region]) {
        maxAchievedScores.value[region] = currentScore.value;
    }
    
    currentScore.value = 0;
}

</script>

<template>
    <div class="home-page">
        <h1>Welcome</h1>
        <p>This is the main landing page of the application.</p>

        <div v-for="region in regions" :key="region">
            <ButtonWithScore
                v-if="!gameRunning"
                :max-score="regionScores[region].maxAchieved"
                :max-possible-score="regionScores[region].maxPossible"
                @click="initGame(region === 'World' ? null : region)"
            >{{ region }}</ButtonWithScore>
        </div>

        <ScoreDisplay 
            v-if="gameRunning"
            :current-score="currentScore"
            :max-score="regionScores[currentFilter || 'World'].maxAchieved"
        />

        <div v-if="gameRunning">
            <GameQuestion :country-name="countryToGuess.name" />
            
            <FlagGrid 
                :countries="countryPossibilities"
                :selected-answer="selectedAnswer"
                :correct-answer="countryToGuess.code"
                @flag-selected="checkAnswer"
            />
        </div>
    </div>
</template>
