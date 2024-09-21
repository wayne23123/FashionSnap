<template>
  <section id="section-media">
    <!-- 左側箭咀 -->
    <div
      id="arrow-btn-prev"
      class="arrowBtn media-nav-btn prev"
      @click="prevSlide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 103">
        <circle class="dot" r="4.5" cx="36" cy="51.5"></circle>
        <g transform="translate(35, 15)">
          <path
            d="M31.274,7.155 L7.392,31.037 C5.870,32.559 3.402,32.559 1.880,31.037 C0.358,29.515 0.358,27.048 1.880,25.526 L25.762,1.644 C27.284,0.122 29.752,0.122 31.274,1.644 C32.795,3.166 32.795,5.633 31.274,7.155 Z"
          />
        </g>
      </svg>
    </div>

    <!-- 輪播主體 -->
    <div class="media-container-box" style="perspective: 5000px">
      <div
        class="media-main-view"
        id="media-layer-view"
        :style="{ transform: `rotateY(${currentAngle}deg)` }"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="media-current"
          :style="{
            transform: `rotateY(${index * itemAngle}deg) translateZ(500px)`,
          }"
        >
          <div class="media-main-pic">
            <a
              target="_blank"
              class="media-img"
              :style="{ backgroundImage: `url(${image})` }"
            ></a>
          </div>
        </div>
      </div>
    </div>

    <!-- 右側箭咀 -->
    <div
      id="arrow-btn-next"
      class="arrowBtn media-nav-btn next"
      @click="nextSlide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 103">
        <circle class="dot" r="4.5" cx="67" cy="51.5"></circle>
        <g transform="translate(35, 15)">
          <path
            d="M30.833,30.926 C29.311,32.448 26.844,32.448 25.322,30.926 L1.440,7.044 C-0.082,5.523 -0.082,3.055 1.440,1.533 C2.962,0.011 5.429,0.011 6.951,1.533 L30.833,25.415 C32.355,26.937 32.355,29.405 30.833,30.926 Z"
          />
        </g>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

// 圖片列表
const images = ref([
  '../assets/image1.jpg',
  '../assets/image2.jpg',
  '../assets/image3.jpg',
  '../assets/image4.jpg',
]);

const currentAngle = ref(0);
const itemAngle = 360 / images.value.length; // 每張圖片的角度

// 切換到上一個圖片
function prevSlide() {
  currentAngle.value += itemAngle;
}

// 切換到下一個圖片
function nextSlide() {
  currentAngle.value -= itemAngle;
}
</script>

<style scoped>
#section-media {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.media-main-view {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

.media-current {
  position: absolute;
  width: 400px;
  height: 300px;
  backface-visibility: hidden;
}

.media-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.arrowBtn {
  position: absolute;
  top: 50%;
  cursor: pointer;
  z-index: 10;
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}
</style>
