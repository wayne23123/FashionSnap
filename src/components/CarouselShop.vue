<script setup>
import { ref } from 'vue';
import { useProductionStore } from '../stores/production';
import { useDemoStore } from '../stores/demo';

const productionStore = useProductionStore();
const demoStore = useDemoStore();

// 控制 carousel 移動的位移距離
const carouselStart = ref(0);
const carouselStep = 210; // 每次移動的距離
const totalItems = 15; // 商品的總數
const visibleItems = 5; // 一次顯示幾個商品
const totalWidth = carouselStep * totalItems; // 總寬度
const visibleWidth = carouselStep * visibleItems; // 可見區域的寬度
let intervalId = null;

// 向右移動
function moveCarouselRight() {
  if (carouselStart.value > -(totalWidth - visibleWidth)) {
    carouselStart.value -= carouselStep;
  } else {
    carouselStart.value = 0; // 回到開始位置
  }
}

// 向左移動
function moveCarouselLeft() {
  if (carouselStart.value < 0) {
    carouselStart.value += carouselStep;
  } else {
    carouselStart.value = -(totalWidth - visibleWidth); // 移動到最後
  }
}

// 開始自動輪播
function startCarousel() {
  intervalId = setInterval(moveCarouselRight, 2000);
}

// 停止自動輪播
function stopCarousel() {
  clearInterval(intervalId);
}

startCarousel(); // 頁面加載時自動開始輪播
</script>

<template>
  <section class="carousel-section">
    <div class="carousel-layout">
      <div
        class="carousel-container"
        @mouseenter="stopCarousel"
        @mouseleave="startCarousel"
      >
        <ul
          :style="{ transform: `translateX(${carouselStart}px)` }"
          class="carousel-items"
        >
          <li
            v-for="production in productionStore.productions.slice(
              0,
              totalItems
            )"
            :key="production.id"
            class="carousel-item"
          >
            <router-link :to="'/demo/' + production.id">
              <img
                :src="production.img"
                alt="Product Image"
                class="carousel-image"
              />
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-section {
  width: 100%;
  height: 210px;
}

.carousel-layout {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.carousel-items {
  display: flex;
  transition: transform 1s ease-in-out;
}

.carousel-item {
  list-style: none;
  width: 210px;
  height: 210px;
  flex-shrink: 0;
  overflow: hidden;
}

.carousel-image {
  width: 100%;
  height: auto;
  transition: transform 0.5s;
}

.carousel-image:hover {
  transform: scale(1.1);
}
</style>
