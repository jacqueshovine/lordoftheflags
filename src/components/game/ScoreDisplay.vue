<script setup>
defineProps({
  currentScore: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  totalRounds: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <div class="score-display" style="text-align: center; margin: 1rem 0;">
    <p>Score: {{ currentScore }} | Best: {{ maxScore }}</p>
  </div>
</template>
