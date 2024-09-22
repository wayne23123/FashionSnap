<script setup>
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';

// 控制返回頂部按鈕的顯示
const showToTop = ref(false);

// 監聽滾動事件，當滾動高度大於 290px 時顯示返回頂部按鈕
window.addEventListener('scroll', () => {
  showToTop.value = window.scrollY > 290;
});

// 返回頂部
function toTopFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <div class="layout">
    <div class="container">
      <header class="navBar">
        <NavBar />
      </header>

      <div class="navTop"></div>

      <router-view></router-view>

      <!-- 返回頂部按鈕 -->
      <transition name="fade">
        <button v-if="showToTop" @click="toTopFunction" class="to-top-btn">
          ▲
        </button>
      </transition>
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
  max-width: 1440px;
  margin: 0 auto;
  background-color: #fefefe;
  overflow-x: hidden;
  padding: 0;
}

.navTop {
  padding-top: 75px;
}

.to-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px; /* 改為 20px 使按鈕更靠右 */
  background-color: #ff6f61;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000; /* 確保按鈕在所有元素之上 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 增加陰影效果 */
  opacity: 0.8; /* 添加透明度 */
}

.to-top-btn:hover {
  background-color: #ff543a;
  opacity: 1; /* 懸停時完全不透明 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* 當螢幕寬度超過 1440px 時，按鈕的 right 距離隨著螢幕變寬而變大 */
@media (min-width: 1440px) {
  .to-top-btn {
    right: calc((100vw - 1440px) / 2 + 20px);
    /* 計算公式：螢幕的寬度減去 1440px 後除以 2，再加上 20px */
  }
}

@media (max-width: 768px) {
  .navTop {
    padding-top: 50px;
  }
}
</style>
