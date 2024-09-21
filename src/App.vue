<script setup>
import NavBar from './components/NavBar.vue';
</script>

<template>
  <div class="layout">
    <div class="container">
      <header class="navBar">
        <NavBar />
      </header>

      <div class="navTop"></div>

      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout {
  background-image: url('@/assets/pictures/tree01.jpeg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  overflow: hidden;
}

.container {
  width: 100vw;
  max-width: 1440px; /* 對超寬螢幕的最大寬度限制 */
  margin: 0 auto; /* 居中對齊 */
  background-color: #fefefe;
  overflow-x: hidden; /* 禁止水平滾動 */
  padding: 0 0;
}

.navTop {
  padding-top: 75px;
}
</style>
