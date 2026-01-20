<script setup>
defineProps({
  region: {
    type: String,
    required: true
  },
  maxScore: {
    type: Number,
    default: 0
  },
  maxPossibleScore: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['click']);
</script>

<template>
  <button 
    class="region-button"
    style="display: block; width: 100%; padding: 0.75rem 1rem; margin: 0.5rem 0; cursor: pointer; text-align: left;"
    @click="emit('click')"
  >
    <span>{{ region }}</span>
    <span style="float: right;">{{ maxScore }} / {{ maxPossibleScore }}</span>
  </button>
</template>
