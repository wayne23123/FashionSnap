<script setup>
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css';
import { useCartStore } from '../stores/cart';
import { useProductionStore } from '../stores/production';

// 使用 import 導入圖片
import w004 from '../assets/imgs/w004.jpg';
import w002 from '../assets/imgs/w002.jpg';
import w003 from '../assets/imgs/w003.jpg';
import { id } from 'element-plus/es/locales.mjs';
import { ref } from 'vue';

// 定義產品數據
const products = [
  {
    id: 2,
    order: '',
    img: w002,
    title: 'Puma Suede',
    category: 'shoes',
    star: '★★★★★',
    stars: 5,
    price: 3000,
    description: 'Puma經典款；低筒；麂皮材質復古',
    color: 'black',
    label: 'Puma',
    counter: 1,
    size: 'M',
    kupeng: false,
    email: '',
    name: '',
    telphone: '',
    adress: '',
    message: '',
    d: '',
    year: '',
    month: '',
    date: '',
    hours: '',
    minutes: '',
    seconds: '',
    pay: false,
    complete: false,
  },
  {
    id: 3,
    order: '',
    img: w003,
    title: 'Champion綠色運動外套',
    category: 'clothes',
    star: '★★★',
    stars: 3,
    price: 2100,
    description: 'Puma經典款；低筒；麂皮材質復古',
    color: 'green',
    label: 'Champion',
    counter: 1,
    size: 'M',
    kupeng: false,
    email: '',
    name: '',
    telphone: '',
    adress: '',
    message: '',
    d: '',
    year: '',
    month: '',
    date: '',
    hours: '',
    minutes: '',
    seconds: '',
    pay: false,
    complete: false,
  },
  {
    id: 4,
    order: '',
    img: w004,
    title: 'Vans old skool',
    category: 'shoes',
    star: '★★★★★',
    stars: 5,
    price: 3200,
    description: 'Vans經典不敗款',
    color: 'black',
    label: 'vans',
    counter: 1,
    size: 'M',
    kupeng: false,
    email: '',
    name: '',
    telphone: '',
    adress: '',
    message: '',
    d: '',
    year: '',
    month: '',
    date: '',
    hours: '',
    minutes: '',
    seconds: '',
    pay: false,
    complete: false,
  },
];

const amountDemo = ref(1);
const sizeRef = ref('M');

// 使用購物車 store
const cartStore = useCartStore();
const productionStore = useProductionStore();

// 添加到購物車功能
function addToCart(product) {
  const targetProduct = productionStore.productions.find(
    (item) => item.id == product.id
  );
  console.log('targetProduct', targetProduct);
  // 添加到購物車
  cartStore.emptyRefs.push({
    id: targetProduct.id,
    img: targetProduct.img,
    title: targetProduct.title,
    category: targetProduct.category,
    star: targetProduct.star,
    price: targetProduct.price,
    description: targetProduct.description,
    counter: amountDemo.value,
    size: sizeRef.value,
  });

  cartStore.comparisonByIdFunction();

  // 顯示成功消息
  ElMessage({
    message: `${product.name} 已成功加入購物車！`,
    type: 'success',
    duration: 2000, // 2 秒後消失
    position: 'bottom',
  });
}
</script>

<template>
  <section class="featured-products">
    <h2>今日好物推薦</h2>
    <br />
    <div class="products-grid">
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
      >
        <img :src="product.img" alt="product image" />
        <h3>{{ product.title }}</h3>
        <p>價格: {{ product.price }}</p>
        <div>
          社群評價:
          <span class="demoYellowStar">{{ product.star }}</span>
        </div>
        <br />
        <button @click="addToCart(product)">新增至購物車</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-products {
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #fafafa, #e75a5a); /* 背景漸變色 */
}

.products-grid {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.product-card {
  width: 300px;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 添加卡片陰影 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px); /* hover 時卡片上移效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 增強陰影效果 */
}

.product-card img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 10px;
}

.demoYellowStar {
  color: #ffc107;
  margin-left: 5px;
}

button {
  padding: 10px;
  background-color: #ff6347;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff4500;
}
</style>
