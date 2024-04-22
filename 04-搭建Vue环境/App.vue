<template>
  <div id="App">
    <h1>{{ message }}</h1>
    <h1>{{ setupMessage }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const message = ref('hello vue');
const setupMessage = ref('hello setup');
</script>

<style scoped>
h1 {
  color: orange;
}
</style>