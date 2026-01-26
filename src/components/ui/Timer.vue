<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  duration: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['timeUp']);

// Time remaining in milliseconds
const timeRemaining = ref(props.duration * 1000);
let intervalId = null;

// Computed display values
const minutes = computed(() => {
  return Math.floor(timeRemaining.value / 60000);
});

const seconds = computed(() => {
  return Math.floor((timeRemaining.value % 60000) / 1000);
});

const centiseconds = computed(() => {
  return Math.floor((timeRemaining.value % 1000) / 10);
});

// Format with leading zeros
const display = computed(() => {
  const m = String(minutes.value).padStart(2, '0');
  const s = String(seconds.value).padStart(2, '0');
  const cs = String(centiseconds.value).padStart(2, '0');
  return `${m}:${s}:${cs}`;
});

function startTimer() {
  const startTime = Date.now();
  const endTime = startTime + props.duration * 1000;

  intervalId = setInterval(() => {
    const now = Date.now();
    timeRemaining.value = Math.max(0, endTime - now);

    if (timeRemaining.value <= 0) {
      stopTimer();
      emit('timeUp');
    }
  }, 10); // Update every 10ms for smooth centiseconds
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<template>
  <div class="timer text-center">
    <span class="text-2xl font-mono font-bold">{{ display }}</span>
  </div>
</template>