<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

import shop02 from '../assets/pictures/shop02.webp';
import carlR from '../assets/pictures/carl-r.jpg';
import hannahM from '../assets/pictures/hannah-m.jpg';

// 輪播項目數據
const items = ref([{ image: shop02 }, { image: carlR }, { image: hannahM }]);

const currentIndex = ref(1); // 開始時顯示真正的第一張
const isDragging = ref(false); // 是否正在拖曳
const startX = ref(0); // 滑鼠按下的起始位置
const translateX = ref(0); // 滑鼠拖動的位移
const autoPlayInterval = ref(null); // 自動播放的 interval
const transitionStyle = ref('transform 0.5s ease'); // 控制動畫

const autoPlayTime = 3000; // 自動播放時間間隔

// 下一張圖片
function nextSlide() {
  currentIndex.value++;
  if (currentIndex.value === items.value.length + 1) {
    // 如果到達克隆的第一張圖片，快速跳轉到真正的第一張
    setTimeout(() => {
      transitionStyle.value = 'none'; // 禁用過渡效果
      currentIndex.value = 1;
    }, 500); // 延遲的時間與過渡時間一致
  } else {
    transitionStyle.value = 'transform 0.5s ease';
  }
}

// 上一張圖片
function prevSlide() {
  currentIndex.value--;
  if (currentIndex.value === 0) {
    // 如果到達克隆的最後一張圖片，快速跳轉到真正的最後一張
    setTimeout(() => {
      transitionStyle.value = 'none'; // 禁用過渡效果
      currentIndex.value = items.value.length;
    }, 500);
  } else {
    transitionStyle.value = 'transform 0.5s ease';
  }
}

// 開始自動播放
function startAutoPlay() {
  autoPlayInterval.value = setInterval(nextSlide, autoPlayTime);
}

// 停止自動播放
function stopAutoPlay() {
  clearInterval(autoPlayInterval.value);
}

// 滑鼠按下事件
function handleMouseDown(event) {
  isDragging.value = true;
  startX.value = event.clientX;
  stopAutoPlay(); // 拖動時暫停自動播放
}

// 滑鼠移動事件
function handleMouseMove(event) {
  if (!isDragging.value) return;

  const currentX = event.clientX;
  translateX.value = currentX - startX.value;
}

// 滑鼠釋放事件
function handleMouseUp() {
  if (!isDragging.value) return;

  const threshold = 50; // 設置滑動切換的閾值
  if (translateX.value > threshold) {
    prevSlide(); // 如果拖曳距離超過閾值，則滑動到上一張
  } else if (translateX.value < -threshold) {
    nextSlide(); // 如果拖曳距離超過閾值，則滑動到下一張
  }

  // 重置拖曳狀態
  isDragging.value = false;
  translateX.value = 0;

  startAutoPlay(); // 釋放後重新啟動自動播放
}

// 組件掛載後啟動自動播放，卸載時停止
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
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
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
