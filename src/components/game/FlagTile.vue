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
      class="w-40 h-auto"
      width="160px"
      height="auto"
    />
  </div>
</template>
