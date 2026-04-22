<script setup>
import { useGameStore } from '@/stores/game';
import FlagGrid from '@/components/game/FlagGrid.vue';
import ScoreDisplay from '@/components/game/ScoreDisplay.vue';
import ResultsDisplay from '@/components/game/ResultsDisplay.vue';
import RegionButton from '@/components/game/RegionButton.vue';
import Footer from '@/components/layout/Footer.vue';
import Timer from '@/components/ui/Timer.vue';
import Loader from '@/components/ui/Loader.vue';

import { PhCompassRose, PhTimer } from "@phosphor-icons/vue";

const modeIcons = { PhCompassRose, PhTimer };

const gameStore = useGameStore();

function setCurrentMode(mode) {
  gameStore.setMode(mode);
}
</script>

<template>
  <main class="max-w-xl mx-auto p-4 flex-1">
    <h1 class="game-title">Lord of the Flags</h1>

    <!-- Loader (when loading flags) -->
    <Loader v-if="gameStore.loading" />

    <!-- Mode Selection -->
    <div v-if="!gameStore.gameRunning && !gameStore.loading" class="mode-picker">
      <button
        v-for="mode in gameStore.modes"
        :key="mode.id"
        class="mode"
        :class="{ active: gameStore.currentMode.id === mode.id }"
        @click="setCurrentMode(mode)"
      >
        <component :is="modeIcons[`Ph${mode.icon}`]" :size="32" class="glyph"/>
        <div class="mode-name">{{ mode.name }}</div>
        <div class="mode-desc">{{ mode.description }}</div>
      </button>
    </div>

    <!-- Region Selection (when game is not running) -->
    <div v-if="!gameStore.gameRunning && !gameStore.loading" class="mt-8">
      <p class="kicker region-label mb-4">Select a Region</p>
      <div class="flex flex-col gap-2">
        <RegionButton
          v-for="region in gameStore.getRegions"
          :key="region"
          :region="region"
        />
      </div>
    </div>

    <!-- Game Area (when game is running) -->
    <div v-if="gameStore.gameRunning && !gameStore.gameEnding">
      <ScoreDisplay/>

      <Timer 
        v-if="gameStore.currentMode.hasTimer" 
        :duration="gameStore.currentMode.timerDuration"
        @timeUp="gameStore.endGame"
      />

      <div v-if="gameStore.flagToGuess" class="text-center my-4">
        <p class="text-2xl font-semibold">{{ gameStore.flagToGuess.name }}</p>
      </div>

      <FlagGrid v-if="gameStore.flagPossibilities.length" />

      <div class="controls-row">
        <button class="btn btn-primary" @click="gameStore.resetGame()">
          Quit Game
        </button>
      </div>
    </div>

    <ResultsDisplay v-if="gameStore.gameEnding" />
  </main>

  <Footer />
</template>

<style scoped>
.game-title {
  font-family: var(--font-title);
  font-size: var(--text-4xl);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  color: var(--earth-900);
  text-align: center;
  margin: 0 0 var(--space-6);
}

.mode-picker {
  display: flex;
  gap: var(--space-5);
  margin-bottom: var(--space-6);
}

.mode {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--parchment-50);
  border: 1.5px solid var(--earth-900);
  color: var(--earth-900);
  padding: 8px 14px;
  border-radius: var(--radius-md);
  text-align: center;
  cursor: pointer;
  transition: background var(--dur-fast) var(--ease-out),
              color var(--dur-fast) var(--ease-out);
}
.mode:hover,
.mode.active {
  background: var(--earth-900);
  color: var(--parchment-50);
}
.mode:focus-visible {
  outline: 2px solid var(--earth-700);
  outline-offset: 2px;
}

.glyph {
  margin-bottom: var(--space-3);
}

.mode-name {
  font-family: var(--font-display);
  font-size: var(--text-md);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.mode-desc {
  font-family: var(--font-body);
  font-style: italic;
  font-size: var(--text-xs);
  opacity: 0.8;
}

.region-label {
  font-size: var(--text-lg);
}

.controls-row {
  display: flex;
  justify-content: center;
  margin-top: var(--space-6);
}
</style>
