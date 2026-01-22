<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div v-if="gameStore.currentMode.id === 'classic'" class="text-center my-4">
    <p class="text-lg">Round: {{ gameStore.getCurrentRound }} / {{ gameStore.getTotalRounds }}</p>
  </div>
  <div v-else-if="gameStore.currentMode.id === 'timer'" class="text-center my-4">
    <p class="text-lg">Round: {{ gameStore.getCurrentRound }}</p>
  </div>
  <div class="text-center my-4">
    <p class="text-lg">Score: {{ gameStore.currentScore }} | Best: {{ gameStore.getCurrentMaxScore }}</p>
  </div>
</template>
