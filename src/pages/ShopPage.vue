<template>
  <div class="shop-page">
    <!-- 搜尋與篩選區 -->
    <div class="filter-bar">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Search products..."
        class="search-input"
        @input="filterProducts"
      />

      <label>
        Category:
        <select
          v-model="selectedCategory"
          @change="filterProducts"
          class="category-select"
        >
          <option value="All">All</option>
          <option value="T-shirt">T-shirt</option>
          <option value="Jacket">Jacket</option>
          <option value="Shoes">Shoes</option>
          <option value="Hat">Hat</option>
        </select>
      </label>

      <!-- 標籤篩選 -->
      <div class="tag-filters">
        <button
          @click="toggleTag('New Arrival')"
          :class="{ active: selectedTags.includes('New Arrival') }"
        >
          New Arrival
        </button>
        <button
          @click="toggleTag('On Sale')"
          :class="{ active: selectedTags.includes('On Sale') }"
        >
          On Sale
        </button>
        <button
          @click="toggleTag('Popular')"
          :class="{ active: selectedTags.includes('Popular') }"
        >
          Popular
        </button>
      </div>
    </div>

    <!-- 商品展示區 -->
    <div class="products-grid">
      <div
        class="product-card"
        v-for="(product, index) in filteredProducts"
        :key="index"
      >
        <div class="product-image-wrapper">
          <img :src="product.image" alt="product image" class="product-image" />
        </div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <div class="tags">
          <span v-for="tag in product.tags" :key="tag" class="tag">{{
            tag
          }}</span>
        </div>
        <router-link :to="`/product/${product.id}`" class="view-details"
          >View Details</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const products = ref([
  {
    id: 1,
    name: 'Stylish T-shirt',
    category: 'T-shirt',
    price: '$20',
    image: '../assets/product1.jpg',
    tags: ['New Arrival'],
  },
  {
    id: 2,
    name: 'Cool Jacket',
    category: 'Jacket',
    price: '$50',
    image: '../assets/product2.jpg',
    tags: ['On Sale'],
  },
  {
    id: 3,
    name: 'Comfy Shoes',
    category: 'Shoes',
    price: '$80',
    image: '../assets/product3.jpg',
    tags: ['Popular'],
  },
  {
    id: 4,
    name: 'Fashion Hat',
    category: 'Hat',
    price: '$30',
    image: '../assets/product4.jpg',
    tags: ['New Arrival', 'Popular'],
  },
  {
    id: 5,
    name: 'Summer T-shirt',
    category: 'T-shirt',
    price: '$22',
    image: '../assets/product5.jpg',
    tags: ['On Sale'],
  },
  {
    id: 6,
    name: 'Winter Jacket',
    category: 'Jacket',
    price: '$70',
    image: '../assets/product6.jpg',
    tags: ['Popular'],
  },
]);

const selectedCategory = ref('All');
const searchTerm = ref('');
const selectedTags = ref([]);

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'All' ||
      product.category === selectedCategory.value;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.value.toLowerCase());
    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.every((tag) => product.tags.includes(tag));

    return matchesCategory && matchesSearch && matchesTags;
  });
});

function toggleTag(tag) {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
}
</script>

<style scoped>
.shop-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input {
  padding: 10px;
  font-size: 1.2rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.category-select {
  padding: 10px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid #ddd;
}

.tag-filters {
  display: flex;
  gap: 10px;
}

.tag-filters button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tag-filters button.active {
  background-color: #ff6347;
  color: white;
  border-color: #ff6347;
}

.tag-filters button:hover {
  background-color: #ff4500;
  color: white;
}

/* 商品展示區設計 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
}

.product-card {
  width: 100%;
  max-width: 280px;
  padding: 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.product-image-wrapper {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.tags {
  margin-top: 10px;
}

.tag {
  display: inline-block;
  background-color: #e9ecef;
  color: #495057;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 5px;
  font-size: 0.9rem;
}

.view-details {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  display: inline-block;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.view-details:hover {
  background-color: #0056b3;
}
</style>
