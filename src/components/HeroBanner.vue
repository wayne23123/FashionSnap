<template>
  <section class="hero-banner">
    <div class="hero-content">
      <h1>Discover Your Fashion Style</h1>
      <p>Explore the latest trends in fashion today</p>
      <button class="shop-now-btn" @click="shopNow">Start Shopping</button>
    </div>
  </section>
</template>

<script setup>
function shopNow() {
  alert("Let's go shopping!");
}
</script>

<style scoped>
.hero-banner {
  background: url('https://via.placeholder.com/1200x500') no-repeat center
    center/cover;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.shop-now-btn {
  padding: 1rem 2rem;
  background-color: #ff6347;
  color: white;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.shop-now-btn:hover {
  background-color: #ff4500;
}
</style>
