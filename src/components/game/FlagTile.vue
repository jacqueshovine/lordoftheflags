<script setup>
import { computed } from 'vue';
import { useGameStore } from '@/stores/game';
import { getFlagUrl } from '@/utils/helpers';

const props = defineProps({
  flag: {
    type: Object,
    required: true
  }
});

const gameStore = useGameStore();

const isDisabled = computed(() => gameStore.selectedAnswer !== null);

const borderClass = computed(() => {
  if (!gameStore.selectedAnswer) {
    return 'border-transparent';
  }
  
  const isCorrect = props.flag.code === gameStore.flagToGuess?.code;
  const isSelected = gameStore.selectedAnswer === props.flag.code;
  
  // TO DO Move hard coded colors to CSS classes
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
    gameStore.checkAnswer(props.flag);
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
      :src="getFlagUrl(flag.code)"
      :alt="flag.name"
      class="w-40 h-auto border-4 transition-colors duration-200"
      :class="borderClass"
    />
  </div>
</template>
