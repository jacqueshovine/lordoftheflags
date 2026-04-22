<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();

const isNewRecord = computed(() => gameStore.currentScore > gameStore.getCurrentMaxScore);
</script>

<template>
  <div class="results-wrap">
    <div class="results-card">
      <div class="results-panel">
        <div class="over">— Game Over —</div>
        <div class="score">{{ gameStore.currentScore }}</div>
        <div class="best">Best: {{ gameStore.getCurrentMaxScore == 0 ? gameStore.currentScore : gameStore.getCurrentMaxScore }}</div>
      </div>
      <div v-if="isNewRecord" class="stamp-wrap">
        <span class="stamp">New Record</span>
      </div>
    </div>

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
.results-wrap {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6) 0;
}

.results-card {
  display: flex;
  gap: var(--space-6);
  align-items: center;
}

.results-panel {
  flex: 1;
  border: 3px double var(--earth-500);
  padding: var(--space-4) var(--space-6);
  background: var(--parchment-100);
  text-align: center;
}

.over {
  font-family: var(--font-display-sc);
  font-size: var(--text-md);
  letter-spacing: 0.18em;
  color: var(--earth-700);
}

.score {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  color: var(--earth-900);
  margin: var(--space-2) 0;
}

.best {
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--earth-700);
}

.stamp-wrap {
  width: 120px;
  text-align: center;
  flex-shrink: 0;
}

.results-actions {
  display: flex;
  gap: var(--space-4);
  flex-wrap: wrap;
  justify-content: center;
}
</style>
