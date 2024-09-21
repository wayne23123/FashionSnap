<template>
  <div class="cart-page">
    <h1>Your Shopping Cart</h1>
    <div v-if="cartItems.length > 0" class="cart-container">
      <div class="cart-item" v-for="(item, index) in cartItems" :key="index">
        <img :src="item.image" alt="Product Image" class="cart-item-image" />
        <div class="cart-item-details">
          <h3>{{ item.name }}</h3>
          <p>Price: {{ item.price }}</p>
          <div class="quantity">
            <label for="quantity">Quantity:</label>
            <input
              type="number"
              v-model="item.quantity"
              min="1"
              @change="updateCart(item)"
            />
          </div>
          <button @click="removeFromCart(index)" class="remove-btn">
            Remove
          </button>
        </div>
      </div>

      <!-- 顯示購物車總價 -->
      <div class="cart-total">
        <h2>Total: {{ totalPrice }}</h2>
        <router-link to="/pay" class="checkout-btn"
          >Proceed to Checkout</router-link
        >
      </div>
    </div>
    <p v-else>Your cart is empty.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 模擬的購物車數據
const cartItems = ref([
  {
    id: 1,
    name: 'Stylish T-shirt',
    price: '$20',
    image: '../assets/product1.jpg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Cool Jacket',
    price: '$50',
    image: '../assets/product2.jpg',
    quantity: 1,
  },
]);

// 計算購物車總價
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + parseFloat(item.price.slice(1)) * item.quantity;
  }, 0);
});

// 刪除購物車中的商品
function removeFromCart(index) {
  cartItems.value.splice(index, 1);
}

// 更新購物車
function updateCart(item) {
  if (item.quantity < 1) {
    item.quantity = 1;
  }
}
</script>

<style scoped>
.cart-page {
  padding: 40px;
  background-color: #f8f9fa;
  min-height: 80vh;
}

.cart-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.cart-item-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.remove-btn {
  padding: 10px 20px;
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #ff4500;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.checkout-btn {
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.checkout-btn:hover {
  background-color: #0056b3;
}
</style>
