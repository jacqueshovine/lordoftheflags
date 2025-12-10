<script setup>
import { ref } from 'vue';
const newTask = ref('');

const tasks = ref([
    { title: 'Test Task 1', completed: false, date: 1023456000 },
    { title: 'Test Task 2', completed: true, date: 1023456200 },
]);

function addTask() {
    if (newTask.value.trim() === '') return;

    tasks.value.push({
        title: newTask.value,
        completed: false,
        date: Date.now(),
    });
    newTask.value = '';
}

function abc(task) {
    task.completed = !task.completed;
}
</script>

<template>
    <div class="sandbox-page">
        <h1>Sandbox Page</h1>
        <p>This is a sandbox for testing new features.</p>
    </div>

    <div>
        <h2>Tasks</h2>
        <form @submit.prevent="addTask()">
            <input type="text" v-model="newTask" placeholder="New Task" />
            <button type="submit">Add Task</button>
        </form>
        <ul>
            <li v-for="task in tasks" :key="task.date">
                <p :class="{ completed: task.completed }">{{ task.title }} - Date: {{ new Date(task.date).toLocaleDateString() }}</p>
                <checkbox>
                    <input type="checkbox" v-model="task.completed" /> Completed
                    <input type="checkbox" @click="abc(task)" /> Completed
                </checkbox>
            </li>
        </ul>
    </div>
</template>

<style>
.completed {
    text-decoration: line-through;
}
</style>