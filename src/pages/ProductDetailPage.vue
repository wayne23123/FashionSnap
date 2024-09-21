<template>
  <div class="product-detail">
    <div class="product-container">
      <!-- 商品圖片區 -->
      <div class="product-image-wrapper">
        <img :src="product.image" alt="product image" class="product-image" />
      </div>

      <!-- 商品信息區 -->
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>

        <!-- 標籤展示 -->
        <div class="product-tags">
          <span v-for="tag in product.tags" :key="tag" class="product-tag">{{
            tag
          }}</span>
        </div>

        <!-- 加入購物車按鈕 -->
        <button class="add-to-cart" @click="addToCart(product)">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// 模擬的商品數據
const products = [
  {
    id: 1,
    name: 'Stylish T-shirt',
    price: '$20',
    image: '../assets/product1.jpg',
    description: 'A stylish t-shirt made of 100% cotton.',
    tags: ['New Arrival'],
  },
  {
    id: 2,
    name: 'Cool Jacket',
    price: '$50',
    image: '../assets/product2.jpg',
    description: 'A cool jacket for your winter wardrobe.',
    tags: ['On Sale'],
  },
  {
    id: 3,
    name: 'Comfy Shoes',
    price: '$80',
    image: '../assets/product3.jpg',
    description: 'Comfortable shoes for everyday wear.',
    tags: ['Popular'],
  },
  {
    id: 4,
    name: 'Fashion Hat',
    price: '$30',
    image: '../assets/product4.jpg',
    description: 'A trendy hat for fashion lovers.',
    tags: ['New Arrival', 'Popular'],
  },
  {
    id: 5,
    name: 'Summer T-shirt',
    price: '$22',
    image: '../assets/product5.jpg',
    description: 'Perfect for summer days.',
    tags: ['On Sale'],
  },
  {
    id: 6,
    name: 'Winter Jacket',
    price: '$70',
    image: '../assets/product6.jpg',
    description: 'A warm jacket for winter.',
    tags: ['Popular'],
  },
];

// 接收路由傳遞的 props
const route = useRoute();
const productId = route.params.id;

// 根據商品ID找到對應的商品
const product = products.find((p) => p.id === parseInt(productId));

// 模擬加入購物車的功能
function addToCart(product) {
  alert(`${product.name} has been added to your cart!`);
}
</script>

<style scoped>
.product-detail {
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.product-container {
  display: flex;
  gap: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  width: 100%;
}

.product-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  object-fit: cover;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.product-price {
  font-size: 1.8rem;
  color: #ff6347;
  margin-bottom: 20px;
}

.product-description {
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #555;
}

.product-tags {
  margin-bottom: 20px;
}

.product-tag {
  display: inline-block;
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 10px;
  margin-right: 10px;
}

.add-to-cart {
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #0056b3;
}
</style>
