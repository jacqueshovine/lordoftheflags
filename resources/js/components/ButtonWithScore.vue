<script setup>
import { computed, ref } from 'vue';

defineProps({
    maxScore: Number,
    maxPossibleScore: Number,
});
</script>

<template>
    <button class="btn btn-primary">
        <slot></slot>
        <span class="badge badge-secondary ml-2">{{ maxScore }} / {{ maxPossibleScore }}</span>
    </button>
</template>