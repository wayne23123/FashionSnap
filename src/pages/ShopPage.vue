<script setup>
import { ref } from 'vue';
import Marquee from '../components/Marquee.vue';
import Footer from '../components/Footer.vue';
import CarouselShop from '../components/CarouselShop.vue';
import { useProductionStore } from '../stores/production';
import { useDemoStore } from '../stores/demo';
import { useCartStore } from '../stores/cart';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';

// Store setup
const productionStore = useProductionStore();
const demoStore = useDemoStore();
const cartStore = useCartStore();

// 用於商品的複製
const copyRef = ref({});
function copyCard(event, product) {
  copyRef.value = { ...product };
  demoStore.demos.push(copyRef.value);
}

// 控制數量和尺寸
const amountRef = ref(1);
const sizeRef = ref('M');

// 將商品加入購物車
function addCartsFunction() {
  cartStore.emptyRefs.push({
    ...copyRef.value,
    size: sizeRef.value,
    counter: amountRef.value,
  });
  cartStore.comparisonByIdFunction();

  // 加入購物車後彈出消息
  ElMessage({
    message: '商品已成功加入購物車！',
    type: 'success',
    duration: 2000,
    showClose: true,
  });
}

// 控制篩選欄的顯示與隱藏
const isFilterOpen = ref(false);
function toggleFilter() {
  isFilterOpen.value = !isFilterOpen.value;
}
</script>

<template>
  <!-- 麵包屑導航 -->
  <nav class="breadcrumb-nav">
    <router-link to="/">首頁</router-link>
    <span>/</span>
    <router-link to="/shop">商店</router-link>
    <span v-if="currentCategory">/</span>
    <span v-if="currentCategory">{{ currentCategory }}</span>
  </nav>
  <section class="shop-page">
    <!-- 篩選切換按鈕 (小螢幕顯示) -->
    <button @click="toggleFilter" class="filter-toggle-btn">篩選</button>

    <!-- 搜尋與分類篩選 -->
    <aside :class="['filter-section', { open: isFilterOpen }]">
      <input
        id="search-field"
        v-model="productionStore.searchTerm"
        placeholder="搜尋商品..."
        class="search-bar"
      />

      <div class="category-filter">
        <label for="all" :class="{ active: productionStore.searchTerm === '' }"
          >全部商品</label
        >
        <input
          id="all"
          type="radio"
          value=""
          v-model="productionStore.searchTerm"
          class="hidden-input"
        />

        <label
          for="hat"
          :class="{ active: productionStore.searchTerm === 'hat' }"
          >帽子分類</label
        >
        <input
          id="hat"
          type="radio"
          value="hat"
          v-model="productionStore.searchTerm"
          class="hidden-input"
        />

        <label
          for="shoes"
          :class="{ active: productionStore.searchTerm === 'shoes' }"
          >鞋子分類</label
        >
        <input
          id="shoes"
          type="radio"
          value="shoes"
          v-model="productionStore.searchTerm"
          class="hidden-input"
        />

        <label
          for="clothes"
          :class="{ active: productionStore.searchTerm === 'clothes' }"
          >衣服分類</label
        >
        <input
          id="clothes"
          type="radio"
          value="clothes"
          v-model="productionStore.searchTerm"
          class="hidden-input"
        />

        <label
          for="pants"
          :class="{ active: productionStore.searchTerm === 'pants' }"
          >褲子分類</label
        >
        <input
          id="pants"
          type="radio"
          value="pants"
          v-model="productionStore.searchTerm"
          class="hidden-input"
        />
      </div>
    </aside>

    <!-- 主要內容區 -->
    <div class="main-content" :class="{ 'filter-open': isFilterOpen }">
      <CarouselShop />

      <!-- 商品展示區 -->
      <div class="product-grid">
        <div
          v-for="product in productionStore.searchedProductionTitle"
          :key="product.id"
          class="product-card"
          @mouseenter="copyCard($event, product)"
        >
          <router-link :to="`/demo/${product.id}`">
            <img :src="product.img" class="product-image" />
          </router-link>
          <div class="product-details">
            <h3>{{ product.title }}</h3>
            <p>種類: {{ product.category }}</p>
            <p>評分: {{ product.star }}</p>
            <p>NT {{ product.price }}</p>
          </div>
          <div class="product-actions">
            <select v-model="sizeRef" class="size-select">
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="S">S</option>
            </select>
            <select v-model="amountRef" class="quantity-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
            <button @click="addCartsFunction" class="add-to-cart-btn">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 頁面底部 -->
  <Footer />
</template>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  font-size: 16px; /* 提升字体大小 */
  color: #666;
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-radius: 8px;
}

.breadcrumb-nav a {
  color: #333;
  text-decoration: none;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  /* background-color: #eaeaea; */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.breadcrumb-nav a:hover {
  background-color: #ff6f61;
  color: white;
}

.breadcrumb-nav span {
  margin: 0 5px;
  color: #999;
}

.breadcrumb-nav a:last-of-type {
  background-color: transparent;
  font-weight: bold;
  color: #ff6f61; /* 最后一个链接字体颜色 */
  background-color: #eaeaea;
}

.shop-page {
  display: flex;
  width: 100vw;
  padding: 20px;
  max-width: 1440px;
  margin: 0 auto;
  min-height: 100vh; /* 保證父容器有足夠高度進行滾動 */
  overflow: visible; /* 確保父容器不會隱藏溢出的內容 */
}

.filter-toggle-btn {
  display: none;
}

.filter-section {
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 10px;
  transition: transform 0.3s ease;
  z-index: 1;
  position: -webkit-sticky; /* for Safari */
  position: sticky;
  top: 20px; /* 設定到頁面頂部的距離 */
}

.search-bar {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
}

.category-filter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.category-filter label {
  text-align: center;
  display: block;
  width: 100%;
}

.hidden-input {
  display: none; /* 隱藏 radio input */
}

label {
  padding: 10px 15px;
  border-radius: 5px;
  border: 1px solid #ddd;
  cursor: pointer;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

label.active {
  background-color: #ff6f61; /* 選中時的背景色 */
  color: white;
}

label:hover {
  background-color: #ff543a; /* hover 時的背景色 */
  color: white;
}

.main-content {
  width: 75vw;
  max-width: 1140px;
  transition: transform 0.3s ease;
}

/* 商品展示區 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.product-card {
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-details {
  margin-top: 10px;
  text-align: center;
}

.product-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.size-select,
.quantity-select {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.add-to-cart-btn {
  background-color: #ff6f61;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #ff543a;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
/* 小螢幕篩選區隱藏與開啟 */
@media screen and (max-width: 768px) {
  .filter-section {
    position: fixed;
    left: 0;
    top: 160px; /* 避免與其他 header 重疊 */
    height: calc(100% - 60px);
    width: 100%; /* 固定為螢幕寬度的 80% */
    background-color: #f5f5f5;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out; /* 添加過渡效果 */
    z-index: 1000; /* 保持篩選區在最上層 */
  }

  .main-content {
    width: 100%; /* 小螢幕時調整為100%寬度 */
    transition: transform 0.3s ease-in-out; /* 添加滑動過渡效果 */
  }

  .filter-section.open {
    transform: translateX(0); /* 滑入顯示 */
  }

  .main-content.filter-open {
    transform: translateX(80%); /* 當篩選區打開時，內容右移 */
  }

  .filter-toggle-btn {
    display: block;
    position: fixed;
    left: 10px;
    top: 100px;
    background-color: #ff6f61;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    z-index: 1001; /* 保持在篩選區前面 */
  }
}
</style>
