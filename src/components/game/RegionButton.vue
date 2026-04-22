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
  <button class="region" @click="handleClick">
    <span class="name">{{ region }}</span>
    <span v-if="gameStore.currentMode.id === 'classic'" class="score">
      {{ regionScore.maxAchieved }} / {{ regionScore.maxPossible }}
    </span>
    <span v-else-if="gameStore.currentMode.id === 'timer'" class="score">
      {{ regionScore.maxAchieved }}
    </span>
  </button>
</template>

<style scoped>
.region {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 13px;
  cursor: pointer;
  border: 1.5px solid var(--earth-900);
  color: var(--earth-900);
  background: var(--parchment-50);
  transition:
    background var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out);
}
.region:hover {
  background: var(--earth-900);
  color: var(--parchment-50);
}
.region:focus-visible {
  outline: 2px solid var(--earth-700);
  outline-offset: 2px;
}
.name {
  letter-spacing: 0.12em;
}
.score {
  font-family: var(--font-numeric);
  font-size: 15px;
  letter-spacing: 0;
  font-variant-numeric: lining-nums tabular-nums;
  line-height: 1;
}
</style>
