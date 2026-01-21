<script setup>
import { useGameStore } from '@/stores/game';
import FlagTile from './FlagTile.vue';

const gameStore = useGameStore();
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <div v-for="country in gameStore.countryPossibilities" :key="country.code" class="flex justify-center">
      <FlagTile :country="country" />
    </div>
  </div>
</template>
