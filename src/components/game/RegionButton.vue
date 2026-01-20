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
    class="block w-full py-3 px-4 my-2 cursor-pointer text-left bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
    @click="emit('click')"
  >
    <span class="font-medium">{{ region }}</span>
    <span class="float-right text-gray-600">{{ maxScore }} / {{ maxPossibleScore }}</span>
  </button>
</template>
