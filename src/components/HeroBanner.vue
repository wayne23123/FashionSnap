<template>
  <section class="hero-banner">
    <div class="banner-content">
      <h1>Discover Your Style</h1>
      <p>Explore the latest trends in fashion today.</p>
      <button class="shop-now">Shop Now</button>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  width: 100%;
  height: 60vh;
  background: linear-gradient(135deg, #ff7f50, #ff4500); /* 背景漸變效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.banner-content {
  text-align: center;
  color: white;
  z-index: 1;
}

h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
}

p {
  font-size: 1.5rem;
  margin-bottom: 30px;
}

.shop-now {
  padding: 10px 20px;
  background-color: #fff;
  color: #ff6347;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 添加按鈕陰影 */
}

.shop-now:hover {
  background-color: #ff4500;
  color: #fff;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); /* 增強 hover 時的陰影效果 */
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.2rem;
  }

  .shop-now {
    font-size: 1rem;
  }
}

@media (max-width: 425px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }

  .shop-now {
    font-size: 0.9rem;
  }
}
</style>
