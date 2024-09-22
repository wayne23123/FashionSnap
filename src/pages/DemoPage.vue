<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import Footer from '../components/Footer.vue';
import { useDemoStore } from '../stores/demo';
import { useCartStore } from '../stores/cart';
import { useProductionStore } from '../stores/production';

// 獲取當前路由參數
const route = useRoute();
const productId = route.params.id; // 獲取路由中的商品 id

// 取得 store
const demoStore = useDemoStore();
const cartStore = useCartStore();
const productionStore = useProductionStore();

// 使用 computed 查找對應的商品
const product = computed(() => {
  return productionStore.productions.find((item) => item.id == productId);
});

// 控制數量和尺寸
const amountDemo = ref(1);
const sizeRef = ref('M');

// 加入購物車功能
function addcopyDemoFunction() {
  if (!product.value) return;

  cartStore.emptyRefs.push({
    id: product.value.id,
    img: product.value.img,
    title: product.value.title,
    category: product.value.category,
    star: product.value.star,
    price: product.value.price,
    description: product.value.description,
    counter: amountDemo.value,
    size: sizeRef.value,
  });

  cartStore.comparisonByIdFunction();

  // 顯示成功消息
  ElMessage({
    message: '商品已成功加入購物車！',
    type: 'success',
    duration: 2000, // 2 秒後消失
    position: 'bottom',
  });
}
</script>

<template>
  <!-- 麵包屑導航 -->
  <nav class="breadcrumb-nav">
    <router-link to="/">首頁</router-link>
    <span>/</span>
    <router-link to="/shop">商店</router-link>
    <span>/</span>
    <router-link :to="`/demo/${product.id}`">{{ product.title }}</router-link>
  </nav>
  <section class="sectionDemo">
    <div v-if="product" class="demoLayout">
      <div class="leftImg">
        <img class="imgSize" :src="product.img" alt="商品圖片" />
      </div>

      <div class="rightInfo">
        <div class="demoTitle">商品名稱: {{ product.title }}</div>
        <div class="demoPrice">商品價格: {{ product.price }}</div>
        <div class="demoStar">
          社群評價:
          <span class="demoYellowStar">{{ product.star }}</span>
        </div>

        <div class="formAddButton">
          <select class="sizeRef" v-model="sizeRef">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="S">S</option>
          </select>

          <select class="amountDemo" v-model="amountDemo">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>

          <button class="demoButton" @click="addcopyDemoFunction">
            新增至購物車
          </button>
        </div>

        <div class="demoCategory">商品種類: {{ product.category }}</div>
        <div class="demoDescriptionTitle">商品簡介:</div>
        <div class="demoDescription">{{ product.description }}</div>
      </div>
    </div>

    <div v-else>
      <p>找不到該商品，請重新嘗試。</p>
    </div>
  </section>

  <Footer />
</template>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
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
  color: #ff6f61;
  background-color: #eaeaea;
}

.sectionDemo {
  display: flex;
  justify-content: center;
  background-color: #f8f8f8;
  padding: 20px;
  min-height: 80vh;
}

.demoLayout {
  width: 80vw;
  max-width: 800px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.leftImg {
  width: 400px;
  height: 400px;
  background-color: #f0f0f0;
  border-radius: 10px;
  overflow: hidden; /* 確保圖片超出部分隱藏 */
  margin-right: 20px;
}

.imgSize {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.imgSize:hover {
  transform: scale(1.1); /* 修正為 class 選擇器 */
  transition: transform 0.3s ease; /* 加入平滑過渡效果 */
}

.rightInfo {
  width: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.demoTitle {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

.demoPrice {
  font-size: 20px;
  color: #ff6f61;
  margin-bottom: 10px;
}

.demoStar {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.demoYellowStar {
  color: #ffc107;
  margin-left: 5px;
}

.formAddButton {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.sizeRef,
.amountDemo {
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.demoButton {
  background-color: #ff6f61;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.demoButton:hover {
  background-color: #ff543a;
}

.demoCategory,
.demoDescriptionTitle,
.demoDescription {
  margin-bottom: 10px;
}

.demoDescription {
  color: #666;
  line-height: 1.5;
}
</style>
