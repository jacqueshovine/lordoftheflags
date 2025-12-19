<script setup>

const props = defineProps({
    country: Object,
    selectedAnswer: String,
    correctAnswer: String
});

defineEmits(['flag-selected']);

const flagBorders = {
    correct: 'border-green-500',
    incorrect: 'border-red-500',
    neutral: 'border-transparent',
}

function getFlagBorderClass(countryCode) {
    if (!props.selectedAnswer) {
        return flagBorders.neutral;
    }
    
    const isSelected = props.selectedAnswer === countryCode;
    const isCorrect = countryCode === props.correctAnswer;
    
    if (isSelected && isCorrect) {
        return flagBorders.correct;
    }
    
    if (isSelected && !isCorrect) {
        return flagBorders.incorrect;
    }
    
    if (!isSelected && isCorrect) {
        return flagBorders.correct;
    }
    
    return flagBorders.neutral;
}
</script>

<template>
    <img :src="country.flag"
        class="justify-self-center cursor-pointer border-4 transition-all"
        :class="getFlagBorderClass(country.code)"
        width="120px"
        height="80px"
        @click="$emit('flag-selected', country)"
    />
</template>