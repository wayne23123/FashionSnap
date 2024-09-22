<script setup>
import { ref } from 'vue';
import Dynamic3DImage from '../components/Dynamic3DImage.vue';
import DynamicTextBanner from '../components/DynamicTextBanner.vue';
import HeroBanner from '../components/HeroBanner.vue';
import Carousel from '../components/Carousel.vue';
import Marquee from '../components/Marquee.vue';
import FeaturedProducts from '../components/FeaturedProducts.vue';
import CarouselShop from '../components/CarouselShop.vue';
import Footer from '../components/Footer.vue';
import FeaturedInfo from '../components/FeaturedInfo.vue';

// 定義 mouseX 和 mouseY 用於儲存滑鼠位置
const mouseX = ref(0);
const mouseY = ref(0);

// 監聽滑鼠移動事件，更新滑鼠位置
const handleMouseMove = (event) => {
  mouseX.value = event.clientX;
  mouseY.value = event.clientY;
};
</script>

<template>
  <div @mousemove="handleMouseMove">
    <Dynamic3DImage :mouseX="mouseX" :mouseY="mouseY" />

    <DynamicTextBanner />

    <!-- 輪播圖 Carousel -->
    <Carousel />

    <!-- 廣告橫幅 Marquee -->
    <Marquee />

    <!-- 推薦商品區 Featured Products -->
    <FeaturedProducts />

    <CarouselShop />

    <!-- Hero Banner -->
    <HeroBanner />

    <FeaturedInfo />

    <!-- 頁腳 Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* 媒體查詢處理不同螢幕尺寸 */
@media (max-width: 1024px) {
  .homeContainer {
    padding: 0 10px;
  }
}

@media (max-width: 768px) {
  .homeContainer {
    padding: 0 5px;
  }
}

@media (max-width: 425px) {
  .homeContainer {
    padding: 0 2px;
  }
}
</style>
