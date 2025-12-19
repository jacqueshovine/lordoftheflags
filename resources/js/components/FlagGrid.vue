<script setup>
import FlagTile from '../components/FlagTile.vue';

defineProps({
    countries: Array,
    selectedAnswer: String,
    correctAnswer: String
});

defineEmits(['flag-selected']);
</script>

<template>
    <div class="grid grid-cols-2 grid-rows-2 gap-4">
        <div v-for="country in countries" :key="country.code" class="content-center">
            <FlagTile
                :country="country"
                :selected-answer="selectedAnswer"
                :correct-answer="correctAnswer" 
                @flag-selected="$emit('flag-selected', $event)" 
            />
        </div>
    </div>
</template>