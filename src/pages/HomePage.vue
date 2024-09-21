<script setup>
import HeroBanner from '../components/HeroBanner.vue';
import Carousel from '../components/Carousel.vue';
import Marquee from '../components/Marquee.vue';
import FeaturedProducts from '../components/FeaturedProducts.vue';
import Footer from '../components/Footer.vue';
</script>

<template>
  <div>
    <!-- 輪播圖 Carousel -->
    <Carousel />

    <!-- 廣告橫幅 Marquee -->
    <Marquee />

    <!-- Hero Banner -->
    <HeroBanner />

    <!-- 推薦商品區 Featured Products -->
    <FeaturedProducts />

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
