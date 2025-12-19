<script setup>
import { computed, ref } from 'vue';
import { shuffle } from '../utils';
import FlagGrid from '../components/FlagGrid.vue';
import ScoreDisplay from '../components/ScoreDisplay.vue';
import GameQuestion from '../components/GameQuestion.vue';

const props = defineProps({
  countries: Array
});

// const countries = ref(props.countries || []);
const countries = computed(() => {
    return props.countries || [];
});

const gameRunning = ref(false);
const roundsLeft = ref(0);

const currentScore = ref(0);
const maxScore = ref(0);

const countryToGuess = ref('');
const countryPossibilities = ref([]);
const selectedAnswer = ref(null);

function initGame() {
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
    if (currentScore.value > maxScore.value) {
        maxScore.value = currentScore.value;
    }
    currentScore.value = 0;
}

</script>

<template>
    <div class="home-page">
        <h1>Welcome</h1>
        <p>This is the main landing page of the application.</p>

        <button v-show="!gameRunning" @click="initGame()">Start Game</button>

        <ScoreDisplay 
            v-show="gameRunning"
            :current-score="currentScore"
            :max-score="maxScore"
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
