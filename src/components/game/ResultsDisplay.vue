<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="results">
    <p class="results-title">Game Over</p>
    <p class="results-score">Final Score: {{ gameStore.currentScore }} | Best: {{ gameStore.getCurrentMaxScore }}</p>
    <div class="results-actions">
      <button class="btn btn-reversed" @click="gameStore.resetGame()">
        Return to Home screen
      </button>
      <button class="btn btn-primary" @click="gameStore.resetGame(true)">
        Play Again
      </button>
    </div>
  </div>
</template>

<style scoped>
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-5);
  text-align: center;
  padding: var(--space-6) 0;
}

.results-title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--earth-900);
  margin: 0;
}

.results-score {
  font-family: var(--font-numeric);
  font-size: var(--text-lg);
  color: var(--earth-700);
  margin: 0;
}

.results-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}
</style>
