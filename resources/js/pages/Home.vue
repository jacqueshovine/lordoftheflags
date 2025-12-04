<script setup lang="ts">
defineProps<{
  countries: Array<{
    name: string;
    flag: string;
    code: string;
    continent: string;
  }>;
}>();
</script>

<template>
    <div class="home-page">
        <h1>Welcome to the Home Page</h1>
        <p>This is the main landing page of the application.</p>

        <div v-for="country in countries" v-bind:key="country.code">
            <div class="flex items-center gap-4 mb-4">
                <img :src="country.flag" :alt="`Flag of ${country.name}`" width="75px" height="50px" />
                {{ country.name }}
            </div>
        </div>
    </div>
</template>