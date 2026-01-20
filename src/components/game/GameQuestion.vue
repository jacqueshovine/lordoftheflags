<script setup>
defineProps({
  countryName: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="text-center my-4">
    <p class="text-2xl font-semibold">{{ countryName }}</p>
  </div>
</template>
