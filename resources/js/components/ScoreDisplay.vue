<script setup>
defineProps({
    currentScore: Number,
    maxScore: Number
});
</script>

<template>
    <div class="score-display">
        <p>Current Score: {{ currentScore }}</p>
        <p>Max Score: {{ maxScore }}</p>
    </div>
</template>
