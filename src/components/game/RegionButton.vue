<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';

const props = defineProps({
  region: {
    type: String,
    required: true
  }
});

const gameStore = useGameStore();

const regionScore = computed(() => gameStore.getRegionScores[props.region]);

function handleClick() {
  const filter = props.region === 'World' ? null : props.region;
  gameStore.initGame(filter);
}
</script>

<template>
  <button 
    class="btn-full btn-reversed text-left"
    @click="handleClick"
  >
    <span class="font-medium">{{ region }}</span>
    <span v-if="gameStore.currentMode.id === 'classic'" class="float-right">{{ regionScore.maxAchieved }} / {{ regionScore.maxPossible }}</span>
    <span v-else-if="gameStore.currentMode.id === 'timer'" class="float-right">{{ regionScore.maxAchieved }}</span>
  </button>
</template>
