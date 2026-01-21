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
    class="block w-full py-3 px-4 my-2 cursor-pointer text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    @click="handleClick"
  >
    <span class="font-medium">{{ region }}</span>
    <span class="float-right text-gray-600">{{ regionScore.maxAchieved }} / {{ regionScore.maxPossible }}</span>
  </button>
</template>
