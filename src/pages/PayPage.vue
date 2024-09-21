<template>
  <div class="pay-page">
    <h1>Checkout</h1>

    <!-- 購物總額顯示 -->
    <div class="order-summary">
      <h2>Order Summary</h2>
      <p>Total: {{ totalPrice }}</p>
    </div>

    <!-- 用戶支付與運送信息 -->
    <div class="payment-form">
      <h2>Shipping Information</h2>
      <form @submit.prevent="processPayment">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input v-model="shippingInfo.name" type="text" id="name" required />
        </div>
        <div class="form-group">
          <label for="address">Shipping Address</label>
          <input
            v-model="shippingInfo.address"
            type="text"
            id="address"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="shippingInfo.email"
            type="email"
            id="email"
            required
          />
        </div>

        <!-- 提交按鈕 -->
        <button type="submit" class="pay-btn">Submit Payment</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// 模擬的購物車數據
const cartItems = ref([
  { id: 1, name: 'Stylish T-shirt', price: '$20', quantity: 1 },
  { id: 2, name: 'Cool Jacket', price: '$50', quantity: 1 },
]);

// 計算總價
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + parseFloat(item.price.slice(1)) * item.quantity;
  }, 0);
});

// 用戶的運送信息
const shippingInfo = ref({
  name: '',
  address: '',
  email: '',
});

// 處理支付
function processPayment() {
  alert(`Payment processed for ${shippingInfo.value.name}!`);
  // 這裡可以調用支付 API 或重定向至支付網關
}
</script>

<style scoped>
.pay-page {
  padding: 40px;
  background-color: #f8f9fa;
  min-height: 80vh;
}

.order-summary {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.payment-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

.pay-btn {
  padding: 15px 25px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.pay-btn:hover {
  background-color: #218838;
}
</style>
