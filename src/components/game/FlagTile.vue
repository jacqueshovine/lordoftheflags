<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { getFlagUrl } from '@/utils/helpers';

const props = defineProps({
  flag: { type: Object, required: true }
});

const gameStore = useGameStore();

const isAnswered = computed(() => gameStore.selectedAnswer !== null);

const tileState = computed(() => {
  if (!gameStore.selectedAnswer) return null;
  if (props.flag.code === gameStore.flagToGuess?.code) return 'correct';
  if (gameStore.selectedAnswer === props.flag.code) return 'wrong';
  return null;
});

function handleClick() {
  if (!isAnswered.value) gameStore.checkAnswer(props.flag);
}
</script>

<template>
  <div
    class="tile"
    :class="[tileState, { dimmed: isAnswered && !tileState }]"
    @click="handleClick"
  >
    <img :src="getFlagUrl(flag.code)" :alt="flag.name" />
  </div>
</template>

<style scoped>
.tile {
  aspect-ratio: 3 / 2;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--dur-base) var(--ease-out);
}

.tile img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  border-radius: 1px;
  transition: box-shadow var(--dur-base) var(--ease-out);
}

.tile.correct img {
  box-shadow: 0 0 0 4px var(--forest-500), var(--glow-correct);
}

.tile.wrong img {
  box-shadow: 0 0 0 4px var(--stamp-red), var(--glow-wrong);
}

.tile.dimmed {
  opacity: 0.4;
}
</style>
