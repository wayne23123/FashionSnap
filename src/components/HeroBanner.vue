<template>
  <div class="hero-banner">
    <div class="content">
      <h1>探索未來的購物體驗</h1>
      <p>從此輕鬆購物，盡享每一次選擇的樂趣</p>
      <router-link to="/shop" class="shop-button">立即開始購物</router-link>
    </div>
  </div>
</template>

<style scoped>
.hero-banner {
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  background: linear-gradient(to bottom right, #ff6a00, #ee0979); /* 漸變背景 */
}

.content {
  background: rgba(0, 0, 0, 0.6);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* 增加陰影 */
}

h1 {
  font-size: 2.5rem;
  margin: 0;
  animation: fadeIn 1s ease-in-out; /* 渐显动画 */
}

p {
  font-size: 1.2rem;
  margin: 10px 0;
  animation: fadeIn 1s ease-in-out 0.5s; /* 渐显动画延迟 */
}

.shop-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #ff4757; /* 按鈕顏色 */
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  text-decoration: none; /* 移除下劃線 */
  animation: pulse 1.5s infinite; /* 添加動畫 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 增加按鈕陰影 */
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    background-color: #e84118; /* 中間狀態改變顏色 */
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.shop-button:hover {
  background-color: #e84118; /* 按鈕懸停顏色 */
}

.shop-button:focus {
  outline: none; /* 移除焦點樣式 */
}
</style>
