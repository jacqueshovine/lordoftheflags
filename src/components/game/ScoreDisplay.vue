<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="text-center my-4">
    <p class="text-lg">Round: {{ gameStore.getCurrentRound }} / {{ gameStore.getTotalRounds }}</p>
  </div>
  <div class="text-center my-4">
    <p class="text-lg">Score: {{ gameStore.currentScore }} | Best: {{ gameStore.getCurrentMaxScore }}</p>
  </div>
</template>
