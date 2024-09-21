<template>
  <div class="form-page">
    <h1>Checkout Form</h1>
    <form @submit.prevent="submitForm">
      <!-- 姓名 -->
      <div class="form-group">
        <label for="name">Full Name</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          :class="{ invalid: errors.name }"
          placeholder="Enter your full name"
          required
        />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <!-- 電子郵件 -->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          :class="{ invalid: errors.email }"
          placeholder="Enter your email"
          required
        />
        <span v-if="errors.email" class="error">{{ errors.email }}</span>
      </div>

      <!-- 地址 -->
      <div class="form-group">
        <label for="address">Address</label>
        <input
          type="text"
          id="address"
          v-model="formData.address"
          :class="{ invalid: errors.address }"
          placeholder="Enter your address"
          required
        />
        <span v-if="errors.address" class="error">{{ errors.address }}</span>
      </div>

      <!-- 提交按鈕 -->
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFormStore } from '../stores/formStore'; // 使用 Pinia 管理表單狀態

const formStore = useFormStore();
const formData = ref({
  name: '',
  email: '',
  address: '',
});

// 錯誤信息存放
const errors = ref({});

// 表單驗證函數
function validateForm() {
  errors.value = {}; // 清除之前的錯誤

  if (!formData.value.name) {
    errors.value.name = 'Full name is required';
  }

  if (!formData.value.email || !/\S+@\S+\.\S+/.test(formData.value.email)) {
    errors.value.email = 'Valid email is required';
  }

  if (!formData.value.address) {
    errors.value.address = 'Address is required';
  }

  return Object.keys(errors.value).length === 0; // 如果沒有錯誤返回 true
}

// 提交表單函數
function submitForm() {
  if (validateForm()) {
    formStore.saveFormData(formData.value); // 保存表單數據到 Pinia
    alert('Form submitted successfully!');
  } else {
    alert('Please correct the errors in the form.');
  }
}
</script>

<style scoped>
.form-page {
  padding: 40px;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.invalid {
  border-color: red;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}
</style>
