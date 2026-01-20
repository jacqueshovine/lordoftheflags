<script setup>
const version = import.meta.env.VITE_APP_VERSION || '0.1.0'
</script>
<template>
    <footer class="text-center text-sm text-gray-500 py-4">
      Lord of the Flags v{{ version }}
    </footer>
</template>
