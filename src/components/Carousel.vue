<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const items = ref([
  { image: './src/assets/pictures/shop02.webp' },
  { image: './src/assets/pictures/carl-r.jpg' },
  { image: './src/assets/pictures/hannah-m.jpg' },
]);

const currentIndex = ref(0);
const autoPlayInterval = ref(null);

// 自動播放的時間間隔（3 秒）
const autoPlayTime = 3000;

// 下一張圖片
function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % items.value.length;
}

// 上一張圖片
function prevSlide() {
  currentIndex.value =
    (currentIndex.value - 1 + items.value.length) % items.value.length;
}

// 自動播放功能
function startAutoPlay() {
  autoPlayInterval.value = setInterval(nextSlide, autoPlayTime);
}

// 停止自動播放
function stopAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
}

// 開始或停止自動播放
function toggleCarousel(action) {
  if (action === 'stop') {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

// 在組件掛載時啟動自動播放，組件卸載時停止
onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>

<template>
  <div class="carousel-container">
    <div
      class="carousel-track"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        class="carousel-item"
        v-for="(item, index) in items"
        :key="index"
        @mouseenter="toggleCarousel('stop')"
        @mouseleave="toggleCarousel('start')"
      >
        <img :src="item.image" alt="carousel image" />
      </div>
    </div>

    <button
      class="prev"
      @click="prevSlide"
      @mouseenter="toggleCarousel('stop')"
      @mouseleave="toggleCarousel('start')"
    >
      ‹
    </button>
    <button
      class="next"
      @click="nextSlide"
      @mouseenter="toggleCarousel('stop')"
      @mouseleave="toggleCarousel('start')"
    >
      ›
    </button>
  </div>
</template>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden;
  perspective: 1000px; /* 3D 透視效果 */
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  transition: transform 0.5s ease-in-out;
}

.carousel-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s ease-in-out;
}

/* 當滑鼠懸停時，圖片縮放效果 */
.carousel-item:hover img {
  transform: scale(1.05); /* 放大圖片 */
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  z-index: 1;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

button:hover {
  background: rgba(0, 0, 0, 0.8);
}

/* 響應式設計 */
@media (max-width: 1200px) {
  .carousel-container {
    height: 700px;
  }
}

@media (max-width: 1050px) {
  .carousel-container {
    height: 550px;
  }
}

@media (max-width: 850px) {
  .carousel-container {
    height: 450px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    height: 350px;
  }

  button {
    font-size: 1.5rem;
  }
}

@media (max-width: 550px) {
  .carousel-container {
    height: 250px;
  }

  button {
    font-size: 1.5rem;
  }
}

@media (max-width: 425px) {
  .carousel-container {
    height: 200px;
  }

  button {
    font-size: 1.2rem;
  }
}
</style>
