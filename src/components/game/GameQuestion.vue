<script setup>
defineProps({
  countryName: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="game-question" style="text-align: center; margin: 1rem 0;">
    <p style="font-size: 1.5rem; font-weight: 600;">{{ countryName }}</p>
  </div>
</template>
