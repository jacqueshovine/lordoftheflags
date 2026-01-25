<script setup>
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
</script>

<template>
    <div class="text-center my-4">
        <p class="text-lg">Game Over</p>
    </div>
    <div class="text-center my-4">
        <p class="text-lg">Final Score: {{ gameStore.currentScore }} | Best: {{ gameStore.getCurrentMaxScore }}</p>
    </div>
    <div class="text-center my-4">
        <button 
            class="btn-primary block mx-auto"
            @click="gameStore.resetGame()"
        >
            Return to Home screen
        </button>
    </div>
    <div class="text-center my-4">
        <button 
            class="btn-primary block mx-auto"
            @click="gameStore.resetGame(true)"
        >
            Play Again
        </button>
    </div>
</template>