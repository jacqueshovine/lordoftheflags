<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  duration: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['timeUp']);

const timeRemaining = ref(props.duration * 1000);
let intervalId = null;

const minutes = computed(() => Math.floor(timeRemaining.value / 60000));
const seconds = computed(() => Math.floor((timeRemaining.value % 60000) / 1000));
const centiseconds = computed(() => Math.floor((timeRemaining.value % 1000) / 10));

const display = computed(() => {
  const m = String(minutes.value).padStart(2, '0');
  const s = String(seconds.value).padStart(2, '0');
  const cs = String(centiseconds.value).padStart(2, '0');
  return `${m}:${s}:${cs}`;
});

const isLow = computed(() => timeRemaining.value <= 10000);

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
  }, 10);
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

onMounted(() => startTimer());
onUnmounted(() => stopTimer());
</script>

<template>
  <div class="timer-wrap">
    <div class="timer-display" :class="{ low: isLow }">{{ display }}</div>
    <div class="timer-label">Remaining</div>
  </div>
</template>

<style scoped>
.timer-wrap {
  text-align: center;
  margin-bottom: var(--space-5);
}

.timer-display {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: var(--text-3xl);
  letter-spacing: 0.02em;
  line-height: 1;
  color: var(--earth-900);
  font-variant-numeric: tabular-nums;
  transition: color var(--dur-fast) var(--ease-out);
}

.timer-display.low {
  color: var(--stamp-red);
}

.timer-label {
  font-family: var(--font-display-sc);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--earth-700);
  margin-top: 6px;
}
</style>
