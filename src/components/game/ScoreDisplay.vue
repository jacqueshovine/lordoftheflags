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
  <div class="text-center my-4">
    <p class="text-lg">Score: {{ currentScore }} | Best: {{ maxScore }}</p>
  </div>
</template>
