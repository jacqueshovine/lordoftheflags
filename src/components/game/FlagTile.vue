<script setup>
import { computed } from 'vue';
import { getFlagUrl } from '@/utils/helpers';

const props = defineProps({
  country: {
    type: Object,
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

const isDisabled = computed(() => props.selectedAnswer !== null);

const borderClass = computed(() => {
  if (!props.selectedAnswer) {
    return 'border-transparent';
  }
  
  const isCorrect = props.country.code === props.correctAnswer;
  const isSelected = props.selectedAnswer === props.country.code;
  
  // Show green border on the correct answer
  if (isCorrect) {
    return 'border-green-500';
  }
  
  // Show red border only on the selected wrong answer
  if (isSelected && !isCorrect) {
    return 'border-red-500';
  }
  
  return 'border-transparent';
});

function handleClick() {
  if (!isDisabled.value) {
    emit('flag-selected', props.country);
  }
}
</script>

<template>
  <div 
    class="cursor-pointer"
    :class="{ 'pointer-events-none': isDisabled }"
    @click="handleClick"
  >
    <img 
      :src="getFlagUrl(country.code)"
      :alt="country.name"
      class="w-40 h-auto border-4 transition-colors duration-200"
      :class="borderClass"
    />
  </div>
</template>
