<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import ResultsDisplay from '@/components/game/ResultsDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';
import Footer from '@/components/layout/Footer.vue';
import Timer from '@/components/ui/Timer.vue';
import Loader from '@/components/ui/Loader.vue';

const gameStore = useGameStore();

function setCurrentMode(mode) {
  gameStore.setMode(mode);
}
</script>

<template>
  <main class="max-w-xl mx-auto p-4">
    <h1 class="game-title">Lord of the Flags</h1>
    <div class="h-20 flex flex-col items-center justify-center">
      <p class="text-xl text-center">{{ gameStore.currentMode.name }}</p>
      <p class="text-center">{{ gameStore.currentMode.description }}</p>
    </div>

    <!-- Loader (when loading flags) -->
    <Loader v-if="gameStore.loading" />

    <!-- Mode Selection -->
    <div v-if="!gameStore.gameRunning && !gameStore.loading" class="mt-8">
      <button 
        v-for="mode in gameStore.modes"
        :key="mode.id"
        class="btn-reversed mb-4 mx-2"
        @click="setCurrentMode(mode)"
      >
        {{ mode.icon }}
      </button>
    </div>

    <!-- Region Selection (when game is not running) -->
    <div v-if="!gameStore.gameRunning && !gameStore.loading" class="mt-8">
      <p class="kicker mb-4">Select a Region</p>
      <div class="flex flex-col gap-2">
        <RegionButton
          v-for="region in gameStore.getRegions"
          :key="region"
          :region="region"
        />
      </div>
    </div>

    <!-- Game Area (when game is running) -->
    <div v-if="gameStore.gameRunning && !gameStore.gameEnding">
      <ScoreDisplay/>

      <Timer 
        v-if="gameStore.currentMode.hasTimer" 
        :duration="gameStore.currentMode.timerDuration"
        @timeUp="gameStore.endGame"
      />

      <div v-if="gameStore.flagToGuess" class="text-center my-4">
        <p class="text-2xl font-semibold">{{ gameStore.flagToGuess.name }}</p>
      </div>

      <FlagGrid v-if="gameStore.flagPossibilities.length" />

      <button 
        class="btn-primary block mx-auto"
        @click="gameStore.resetGame()"
      >
        Quit Game
      </button>
    </div>

    <ResultsDisplay v-if="gameStore.gameEnding" />
  </main>

  <Footer />
</template>

<style scoped>
.game-title {
  font-family: var(--font-title);
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--earth-900);
  text-align: center;
  margin: 0 0 var(--space-4);
}
</style>
