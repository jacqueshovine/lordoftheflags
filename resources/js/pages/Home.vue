<script setup>
import { ref } from 'vue';
import { shuffle } from '../utils';
import FlagGrid from '../components/FlagGrid.vue';

const props = defineProps({
  countries: Array
});

const countries = ref(props.countries || []);

const gameRunning = ref(false);
const roundsLeft = ref(0);

const currentScore = ref(0);
const maxScore = ref(0);

const countryToGuess = ref('');
const countryPossibilities = ref([]);
const selectedAnswer = ref(null);

const flagBorders = {
    correct: 'border-green-500',
    incorrect: 'border-red-500',
    neutral: 'border-transparent',
}

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

function getFlagBorderClass(countryCode) {
    if (!selectedAnswer.value) {
        return flagBorders.neutral;
    }
    
    const isSelected = selectedAnswer.value === countryCode;
    const isCorrect = countryCode === countryToGuess.value.code;
    
    if (isSelected && isCorrect) {
        return flagBorders.correct;
    }
    
    if (isSelected && !isCorrect) {
        return flagBorders.incorrect;
    }
    
    if (!isSelected && isCorrect) {
        return flagBorders.correct;
    }
    
    return flagBorders.neutral;
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

        <div v-show="gameRunning">
            <p>Current Score: {{ currentScore }}</p>
            <p>Max Score: {{ maxScore }}</p>
        </div>


        <div v-if="gameRunning">
            <p>{{ countryToGuess.name }}</p>
            <div class="grid grid-cols-2 grid-rows-2 gap-4">
                <div v-for="country in countryPossibilities" :key="country.code" class="content-center">
                    <img :src="country.flag"
                        class="justify-self-center cursor-pointer border-4 transition-all"
                        :class="getFlagBorderClass(country.code)"
                        width="120px"
                        height="80px" 
                        @click="checkAnswer(country)" />
                </div>
            </div>
        </div>
    </div>
</template>