<script setup>
import { useGameStore } from '@/stores/game';
import FlagTile from './FlagTile.vue';

const gameStore = useGameStore();
</script>

<template>
  <div class="flag-grid">
    <FlagTile
      v-for="flag in gameStore.flagPossibilities"
      :key="`${gameStore.getCurrentRound}-${flag.code}`"
      :flag="flag"
    />
  </div>
</template>

<style scoped>
.flag-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 360px;
  margin: 0 auto;
}
</style>
