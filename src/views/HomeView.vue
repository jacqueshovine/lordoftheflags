<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import GameQuestion from '@/components/game/GameQuestion.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';
import Footer from '@/components/layout/Footer.vue';

const gameStore = useGameStore();

function startGame(region) {
  const filter = region === 'World' ? null : region;
  gameStore.initGame(filter);
}
</script>

<template>
  <main class="max-w-xl mx-auto p-4">
    <h1 class="text-3xl font-bold text-center">Lord of the Flags</h1>
    <p class="text-center text-gray-600">Guess the flag!</p>

    <!-- Region Selection (when game is not running) -->
    <div v-if="!gameStore.gameRunning" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Select a Region</h2>
      <RegionButton
        v-for="region in gameStore.regions"
        :key="region"
        :region="region"
        :max-score="gameStore.regionScores[region].maxAchieved"
        :max-possible-score="gameStore.regionScores[region].maxPossible"
        @click="startGame(region)"
      />
    </div>

    <!-- Game Area (when game is running) -->
    <div v-if="gameStore.gameRunning">
      <ScoreDisplay
        :current-score="gameStore.currentScore"
        :max-score="gameStore.currentMaxScore"
      />

      <GameQuestion 
        v-if="gameStore.countryToGuess"
        :country-name="gameStore.countryToGuess.name" 
      />

      <FlagGrid
        v-if="gameStore.countryPossibilities.length"
        :countries="gameStore.countryPossibilities"
        :selected-answer="gameStore.selectedAnswer"
        :correct-answer="gameStore.countryToGuess?.code"
        @flag-selected="gameStore.checkAnswer"
      />

      <button 
        class="block mx-auto mt-8 py-2 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        @click="gameStore.resetGame"
      >
        Quit Game
      </button>
    </div>
  </main>

  <Footer />
</template>
