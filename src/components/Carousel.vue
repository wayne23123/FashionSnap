<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import shop02 from '../assets/pictures/shop02.webp';
import carlR from '../assets/pictures/carl-r.jpg';
import hannahM from '../assets/pictures/hannah-m.jpg';

const items = ref([{ image: shop02 }, { image: carlR }, { image: hannahM }]);

const currentIndex = ref(1);
const isDragging = ref(false);
const startX = ref(0);
const translateX = ref(0);
const autoPlayInterval = ref(null);
const transitionStyle = ref('transform 0.5s ease');

const autoPlayTime = 3000;

// 下一張圖片
function nextSlide() {
  currentIndex.value++;
  if (currentIndex.value === items.value.length + 1) {
    setTimeout(() => {
      transitionStyle.value = 'none';
      currentIndex.value = 1;
    }, 500);
  } else {
    transitionStyle.value = 'transform 0.5s ease';
  }
}

// 上一張圖片
function prevSlide() {
  currentIndex.value--;
  if (currentIndex.value === 0) {
    setTimeout(() => {
      transitionStyle.value = 'none';
      currentIndex.value = items.value.length;
    }, 500);
  } else {
    transitionStyle.value = 'transform 0.5s ease';
  }
}

// 開始自動播放
function startAutoPlay() {
  // 只有當 autoPlayInterval 為 null 時，才會創建新的 setInterval
  if (!autoPlayInterval.value) {
    autoPlayInterval.value = setInterval(nextSlide, autoPlayTime);
  }
}

// 停止自動播放
function stopAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null; // 確保可以正確重啟
  }
}

const leaveHandler = () => {
  startAutoPlay();
  handleEnd();
};

// 滑鼠/觸控按下事件
function handleStart(event) {
  isDragging.value = true;
  startX.value =
    event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
  stopAutoPlay();
}

// 滑鼠/觸控移動事件
function handleMove(event) {
  if (!isDragging.value) return;

  const currentX =
    event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
  translateX.value = currentX - startX.value;
}

// 滑鼠/觸控釋放事件
function handleEnd() {
  if (!isDragging.value) return;

  const threshold = 50;
  if (translateX.value > threshold) {
    prevSlide();
  } else if (translateX.value < -threshold) {
    nextSlide();
  }

  isDragging.value = false;
  translateX.value = 0;
  startAutoPlay();
}

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div
    class="carousel-container"
    @mousedown="handleStart"
    @mousemove="handleMove"
    @mouseup="handleEnd"
    @mouseleave="leaveHandler"
    @touchstart="handleStart"
    @touchmove="handleMove"
    @touchend="handleEnd"
    @mouseenter="stopAutoPlay"
  >
    <div
      class="carousel-track"
      :style="{
        transform: `translateX(calc(-${
          currentIndex * 100
        }% + ${translateX}px))`,
        transition: transitionStyle,
      }"
    >
      <!-- 克隆最後一張圖片，放在第一個位置 -->
      <div class="carousel-item">
        <img :src="items[items.length - 1].image" alt="carousel image" />
      </div>

      <!-- 真正的輪播項目 -->
      <div class="carousel-item" v-for="(item, index) in items" :key="index">
        <img :src="item.image" alt="carousel image" />
      </div>

      <!-- 克隆第一張圖片，放在最後一個位置 -->
      <div class="carousel-item">
        <img :src="items[0].image" alt="carousel image" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: grab;
  height: 650px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease; /* 默認過渡效果 */
}

.carousel-item {
  min-width: 100%;
}

img {
  width: 100%;
  height: auto;
  user-select: none; /* 禁止選中圖片 */
  user-drag: none; /* 禁止拖曳圖片 */
  pointer-events: none; /* 禁止圖片接收滑鼠事件 */
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 2rem;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

@media (min-width: 768px) and (max-width: 992px) {
  .carousel-container {
    height: 500px;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .carousel-container {
    height: 380px;
  }
}

@media (max-width: 576px) {
  .carousel-container {
    height: 240px;
  }
}
</style>
