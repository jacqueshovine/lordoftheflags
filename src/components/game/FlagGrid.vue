<script setup>
import FlagTile from './FlagTile.vue';

defineProps({
  countries: {
    type: Array,
    required: true
  },
  selectedAnswer: {
    type: String,
    default: null
  },
  correctAnswer: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['flag-selected']);
</script>

<template>
  <div class="flag-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
    <div v-for="country in countries" :key="country.code" style="display: flex; justify-content: center;">
      <FlagTile
        :country="country"
        :selected-answer="selectedAnswer"
        :correct-answer="correctAnswer"
        @flag-selected="emit('flag-selected', $event)"
      />
    </div>
  </div>
</template>
