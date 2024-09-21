<template>
  <div class="pay-page">
    <h1>Checkout</h1>

    <!-- 訂單摘要 -->
    <div class="order-summary">
      <h2>Order Summary</h2>
      <div v-for="(item, index) in cartItems" :key="index" class="order-item">
        <p>
          {{ item.name }} - Quantity: {{ item.quantity }} - Price:
          {{ item.price }}
        </p>
      </div>
      <h3>Total: {{ totalPrice }}</h3>
    </div>

    <!-- 支付方式選擇 -->
    <div class="payment-method">
      <h2>Payment Method</h2>
      <label>
        <input
          type="radio"
          v-model="selectedPaymentMethod"
          value="Credit Card"
        />
        Credit Card
      </label>
      <label>
        <input type="radio" v-model="selectedPaymentMethod" value="PayPal" />
        PayPal
      </label>
      <label>
        <input
          type="radio"
          v-model="selectedPaymentMethod"
          value="Bank Transfer"
        />
        Bank Transfer
      </label>
    </div>

    <!-- 提交按鈕 -->
    <button @click="submitOrder" class="pay-btn">Submit Order</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '../stores/cartStore';

const cartStore = useCartStore();

// 計算總價
const totalPrice = computed(() => {
  return cartStore.cartItems.reduce((total, item) => {
    return total + parseFloat(item.price.slice(1)) * item.quantity;
  }, 0);
});

// 模擬選擇的支付方式
const selectedPaymentMethod = ref('Credit Card');

// 提交訂單
function submitOrder() {
  if (!selectedPaymentMethod.value) {
    alert('Please select a payment method.');
    return;
  }
  alert(`Order submitted with payment method: ${selectedPaymentMethod.value}`);
  // 模擬支付成功後跳轉到訂單確認頁面
  // 可以用 router.push() 跳轉到訂單確認頁面
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

.order-item {
  margin-bottom: 10px;
}

.payment-method {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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
