<template>
  <div class="flex flex-col items-center justify-center py-8">
    <div class="spinner"></div>
    <p class="mt-4 text-center">Loading flags...</p>
  </div>
</template>

<style scoped>
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--color-primary);
  border-top-color: var(--color-white);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
