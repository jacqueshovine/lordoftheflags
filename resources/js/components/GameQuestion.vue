<script setup>
defineProps({
    countryName: String
});
</script>

<template>
    <div class="game-question">
        <p class="text-xl font-semibold">{{ countryName }}</p>
    </div>
</template>
