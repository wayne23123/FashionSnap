<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 控制小螢幕上的菜單開關
const isMenuOpen = ref(false);

// 切換小螢幕菜單的開關狀態
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

// 監聽滾動事件，當滾動時給 navbar 添加 class
onMounted(() => {
  const navbar = document.querySelector('.navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);

  // 卸載事件監聽器
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<template>
  <header class="navbar">
    <!-- LOGO -->
    <router-link to="/" class="logo">
      <img src="../assets/svgs/wss.svg" alt="Logo" />
    </router-link>

    <!-- 大螢幕的導航連結 -->
    <nav class="nav-links">
      <router-link to="/" class="nav-item">首頁</router-link>
      <router-link to="/shop" class="nav-item">商品</router-link>
      <router-link to="/about" class="nav-item">關於我們</router-link>
      <router-link to="/cart" class="nav-item">購物車</router-link>
    </nav>

    <!-- 小螢幕的漢堡菜單按鈕 -->
    <button class="menu-button" @click="toggleMenu">☰</button>

    <!-- 小螢幕的導航菜單 -->
    <nav v-show="isMenuOpen" class="mobile-nav-links">
      <router-link to="/" class="mobile-nav-item" @click="toggleMenu"
        >首頁</router-link
      >
      <router-link to="/shop" class="mobile-nav-item" @click="toggleMenu"
        >商品</router-link
      >
      <router-link to="/about" class="mobile-nav-item" @click="toggleMenu"
        >關於我們</router-link
      >
      <router-link to="/cart" class="mobile-nav-item" @click="toggleMenu"
        >購物車</router-link
      >
    </nav>
  </header>
</template>

<style scoped>
/* Navbar 核心樣式 */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5); /* 透明度50%的白色 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  padding: 0px 20px;
  position: fixed;
  top: 0;
  width: 100vw;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 200;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

/* 寬螢幕優化 */
@media (min-width: 1200px) {
  .navbar {
    padding: 0 20px;
    max-width: 1440px;
    margin: 0 auto;
  }
}

/* 滾動時改變背景色 */
.navbar.scrolled {
  background-color: rgba(255, 255, 255, 0.9); /* 滾動時增加不透明度 */
  backdrop-filter: blur(15px); /* 增加模糊程度 */
}

/* 大螢幕的 LOGO 樣式 */
.logo img {
  height: 50px;
}

/* 大螢幕的導航連結樣式 */
.nav-links {
  display: flex;
}

.nav-item {
  color: black;
  text-decoration: none;
  font-size: 18px;
  padding: 25px 20px;
  transition: color 0.3s ease;
}

.nav-item:hover {
  background-color: #f0f0f0;
  color: #007bff; /* 提升互動感 */
}

/* 小螢幕的漢堡菜單按鈕樣式 */
.menu-button {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.menu-button:hover {
  color: #007bff;
}
/* 小螢幕的導航菜單樣式 */
.mobile-nav-links {
  display: none;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.mobile-nav-item {
  color: black;
  text-decoration: none;
  font-size: 18px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.mobile-nav-item:hover {
  background-color: #f0f0f0;
}

.nav-item.router-link-exact-active {
  color: #ff0000; /* 例如紅色高亮 */
  background-color: #e4e3e3;
}

.mobile-nav-item.router-link-exact-active {
  color: #ff0000;
}

/* 小螢幕漢堡菜單啟用 */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* 隱藏大螢幕的導航連結 */
  }

  .menu-button {
    display: block; /* 顯示小螢幕的漢堡菜單按鈕 */
  }

  .mobile-nav-links {
    display: flex; /* 顯示小螢幕的導航菜單 */
  }
}
</style>
