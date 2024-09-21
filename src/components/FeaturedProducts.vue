<template>
  <section class="featured-products">
    <h2>Today's Featured Products</h2>
    <div class="products-grid">
      <div
        class="product-card"
        v-for="(product, index) in products"
        :key="index"
      >
        <img :src="product.image" alt="product image" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  </section>
</template>

<script setup>
// 使用 import 導入圖片
import w001 from '../assets/imgs/w001.jpg';
import w002 from '../assets/imgs/w002.jpg';
import w003 from '../assets/imgs/w003.jpg';

const products = [
  {
    name: 'Stylish T-shirt',
    price: '$20',
    image: w001,
  },
  { name: 'Cool Jacket', price: '$50', image: w002 },
  { name: 'Comfy Shoes', price: '$80', image: w003 },
];
</script>

<style scoped>
.featured-products {
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #fafafa, #f0f0f0); /* 背景漸變色 */
}

.products-grid {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.product-card {
  width: 200px;
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
