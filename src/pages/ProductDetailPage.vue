<script setup>
import { useCartStore } from '../stores/useCartStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const cartStore = useCartStore();

// 模擬商品數據
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
];

// 獲取當前商品的 ID
const productId = route.params.id;
const product = products.find((p) => p.id === parseInt(productId));

// 添加到購物車
function addToCart() {
  cartStore.addToCart(product);
  alert(`${product.name} has been added to your cart!`);
}
</script>

<template>
  <div class="product-detail">
    <div class="product-container">
      <div class="product-image-wrapper">
        <img :src="product.image" alt="product image" class="product-image" />
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="product-price">{{ product.price }}</p>
        <p class="product-description">{{ product.description }}</p>
        <button class="add-to-cart" @click="addToCart">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

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
