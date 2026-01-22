<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';
import Footer from '@/components/layout/Footer.vue';

const gameStore = useGameStore();

function setCurrentMode(mode) {
  gameStore.setMode(mode);
}
</script>

<template>
  <main class="max-w-xl mx-auto p-4">
    <h1 class="text-3xl font-bold text-center">Lord of the Flags</h1>
    <p class="text-center text-gray-600">Guess the flag!</p>

    <!-- Mode Selection -->
    <div v-if="!gameStore.gameRunning" class="mt-8">
      <button 
        v-for="mode in gameStore.modes"
        :key="mode.id"
        class="btn-primary mb-4 mx-2"
        @click="setCurrentMode(mode)"
      >
        {{ mode.icon }}
      </button>
    </div>

    <!-- Region Selection (when game is not running) -->
    <div v-if="!gameStore.gameRunning" class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Select a Region</h2>
      <RegionButton
        v-for="region in gameStore.getRegions"
        :key="region"
        :region="region"
      />
    </div>

    <!-- Game Area (when game is running) -->
    <div v-if="gameStore.gameRunning">
      <ScoreDisplay/>

      <div v-if="gameStore.countryToGuess" class="text-center my-4">
        <p class="text-2xl font-semibold">{{ gameStore.countryToGuess.name }}</p>
      </div>

      <FlagGrid v-if="gameStore.countryPossibilities.length" />

      <button 
        class="btn-primary block mx-auto"
        @click="gameStore.resetGame"
      >
        Quit Game
      </button>
    </div>
  </main>

  <Footer />
</template>
