<script setup>
import HeroBanner from '../components/HeroBanner.vue';
import Carousel from '../components/Carousel.vue';
import Marquee from '../components/Marquee.vue';
import FeaturedProducts from '../components/FeaturedProducts.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div class="homeContainer">
    <!-- Hero Banner -->
    <HeroBanner />

    <!-- 輪播圖 Carousel -->
    <Carousel />

    <!-- 廣告橫幅 Marquee -->
    <Marquee />

    <!-- 推薦商品區 Featured Products -->
    <FeaturedProducts />

    <!-- 頁腳 Footer -->
    <Footer />
  </div>
</template>

<style scoped>
/* 主要容器設定 */
.homeContainer {
  width: 100vw;
  max-width: 1440px; /* 對超寬螢幕的最大寬度限制 */
  margin: 0 auto; /* 居中對齊 */
  background-color: #fefefe;
  overflow-x: hidden; /* 禁止水平滾動 */
  padding: 0 0;
}

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
