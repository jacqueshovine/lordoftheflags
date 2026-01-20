<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import GameQuestion from '@/components/game/GameQuestion.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';

const gameStore = useGameStore();

function startGame(region) {
  const filter = region === 'World' ? null : region;
  gameStore.initGame(filter);
}
</script>

<template>
  <main style="margin: 0 auto; padding: 1rem;">
    <h1 style="text-align: center;">Lord of the Flags</h1>
    <p style="text-align: center;">Guess the flag!</p>

    <!-- Region Selection (when game is not running) -->
    <div v-if="!gameStore.gameRunning" style="margin-top: 2rem;">
      <h2>Select a Region</h2>
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
        style="display: block; margin: 2rem auto; padding: 0.5rem 1rem; cursor: pointer;"
        @click="gameStore.resetGame"
      >
        Quit Game
      </button>
    </div>
  </main>
</template>
