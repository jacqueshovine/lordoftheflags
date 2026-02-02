<script setup>
import { useGameStore } from '@/stores/game';
import FlagTile from './FlagTile.vue';

const gameStore = useGameStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="flag in gameStore.flagPossibilities" :key="`${gameStore.getCurrentRound}-${flag.code}`" class="flex justify-center">
      <FlagTile :flag="flag" />
    </div>
  </div>
</template>
