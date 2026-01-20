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
  <div class="grid grid-cols-2 gap-4">
    <div v-for="country in countries" :key="country.code" class="flex justify-center">
      <FlagTile
        :country="country"
        :selected-answer="selectedAnswer"
        :correct-answer="correctAnswer"
        @flag-selected="emit('flag-selected', $event)"
      />
    </div>
  </div>
</template>
