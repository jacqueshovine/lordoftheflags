<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';
import Footer from '@/components/layout/Footer.vue';

const gameStore = useGameStore();
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
        class="block mx-auto mt-8 py-2 px-4 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded transition-colors"
        @click="gameStore.resetGame"
      >
        Quit Game
      </button>
    </div>
  </main>

  <Footer />
</template>
