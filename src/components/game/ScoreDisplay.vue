<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
  <div class="score-bar">
    <div class="stat">
      <div class="stat-value">
        <template v-if="gameStore.currentMode.id === 'classic'">
          {{ gameStore.getCurrentRound }} / {{ gameStore.getTotalRounds }}
        </template>
        <template v-else>
          {{ gameStore.getCurrentRound }}
        </template>
      </div>
      <div class="stat-label">Round</div>
    </div>

    <div class="stat">
      <div class="stat-value">{{ gameStore.currentScore }}</div>
      <div class="stat-label">Score</div>
    </div>

    <div class="stat">
      <div class="stat-value stat-value--gold">{{ gameStore.getCurrentMaxScore }}</div>
      <div class="stat-label">Best</div>
    </div>
  </div>
</template>

<style scoped>
.score-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-6);
  padding: var(--space-4) 0;
  border-top: var(--border-hairline);
  border-bottom: var(--border-hairline);
  margin-bottom: var(--space-5);
}

.stat {
  text-align: center;
  flex: 1;
}

.stat-value {
  font-family: var(--font-numeric);
  font-size: var(--text-2xl);
  font-weight: 400;
  line-height: 1;
  color: var(--earth-900);
  font-variant-numeric: lining-nums tabular-nums;
}

.stat-value--gold {
  color: var(--stamp-gold);
}

.stat-label {
  font-family: var(--font-display-sc);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--earth-700);
  margin-top: 6px;
}
</style>
