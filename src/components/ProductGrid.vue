<template>
  <section class="product-grid">
    <h2>Our Products</h2>
    <div class="products">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <button @click="addToCart(product)">Add to Cart</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const products = ref([
  {
    name: 'Fashion Shirt',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'Casual Pants',
    price: '$35',
    image: 'https://via.placeholder.com/150',
  },
  { name: 'Sneakers', price: '$50', image: 'https://via.placeholder.com/150' },
  { name: 'Jacket', price: '$75', image: 'https://via.placeholder.com/150' },
]);

function addToCart(product) {
  alert(`${product.name} has been added to your cart!`);
}
</script>

<style scoped>
.product-grid {
  padding: 2rem 1rem;
  text-align: center;
}

.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1rem;
  transition: transform 0.3s ease;
}

.product-card img {
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.product-card:hover {
  transform: translateY(-5px);
}

button {
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff4500;
}
</style>
