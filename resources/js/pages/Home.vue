<script setup>
import { ref } from 'vue';
import { shuffle } from '../utils';

const props = defineProps({
  countries: Array
});

const gameRunning = ref(false);
const countries = ref(props.countries || []);
const currentScore = ref(0);
const maxScore = ref(0)
const countryToGuess = ref('');
const countryPossibilities = ref([]);
const roundsLeft = ref(0);

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

function endGame() {
    gameRunning.value = false;
    alert(`Game over! Your final score is ${currentScore.value}.`);
    if (currentScore.value > maxScore.value) {
        maxScore.value = currentScore.value;
    }
    currentScore.value = 0;
}

</script>

<template>
    <div class="home-page">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of the application.</p>

        <button v-show="!gameRunning" @click="initGame()">Start Game</button>

        <div v-show="gameRunning">
            <p>Current Score: {{ currentScore }}</p>
            <p>Max Score: {{ maxScore }}</p>
        </div>


        <div v-if="gameRunning">
            <p>{{ countryToGuess.name }}</p>
            <div class="grid grid-cols-2 grid-rows-2 gap-4">
                <div v-for="country in countryPossibilities" :key="country.code" class="flag-option">
                    <img :src="country.flag"
                        width="75px"
                        height="50px" 
                        @click=" 
                            if (country.code === countryToGuess.code) {
                                currentScore++;
                            }
                            nextRound();
                    " />
                </div>
            </div>
        </div>
    </div>
</template>