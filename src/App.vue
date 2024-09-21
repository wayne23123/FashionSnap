<script setup>
import '../src/assets/main.css';
import NavBar from './components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>
  <router-view></router-view>
</template>

<style>
html {
  background-color: #c4c4c4;
}
</style>
