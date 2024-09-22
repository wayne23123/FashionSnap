<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import Footer from '../components/Footer.vue';
import Marquee from '../components/Marquee.vue';
import { useCartStore } from '../stores/cart';
import { useSteponeStore } from '../stores/stepone';

const router = useRouter(); // 使用 vue-router 的編程導航

const cartStore = useCartStore();
const steponeStore = useSteponeStore();

// 這個 Ref 保存在第一步對 carts 增減的狀態
const emptyCopyCartsRef = ref({});

// 當滑鼠移入 前去結帳 時會觸發保存當下的 carts 到 emptyCopyCartsRef 並清空 stepones 後推進去

function navigate() {
  // 根據 cartsHasProductionFunction() 來決定導航
  if (cartStore.cartsHasProductionFunction()) {
    router.push('/form'); // 前去結帳
  } else {
    router.push('/shop'); // 到商城看新商品
  }
}

function copyStepOne() {
  // 保存當下的 carts 狀態
  emptyCopyCartsRef.value = cartStore.carts;
  // 清空 stepones
  steponeStore.stepones = [];
  // 將 carts 狀態加入 stepones
  steponeStore.stepones.push(...emptyCopyCartsRef.value);

  navigate();
}

// 計算所有商品數量
const total = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 計算所有商品總價格
const totalPrice = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});

const inputKupengRef = ref('');

const useKupengRef = ref(false);

// 當使用者輸入優惠碼時會觸發
function useKupengFunction() {
  // 保存當下的 carts 狀態
  emptyCopyCartsRef.value = cartStore.carts;
  if (inputKupengRef.value == 'open') {
    steponeStore.updateMultipleKupengValues();
    useKupengRef.value = true;
    alert('套用成功');
  } else {
    alert('非活動優惠碼');
    return;
  }
}
</script>

<template>
  <!-- 麵包屑導航 -->
  <nav class="breadcrumb-nav">
    <router-link to="/">首頁</router-link>
    <span>/</span>
    <router-link to="/shop">商店</router-link>
    <span>/</span>
    <router-link to="/cart">購物車</router-link>
  </nav>

  <Marquee />

  <div class="cartPageLayout">
    <section class="sectionBuyProcess">
      <div class="buyProcessLayout">
        <div class="processDivOne">step1.確認購物清單</div>
        <div class="processDivTwo">step2.填寫購買資料</div>
        <div class="processDivThree">step3.付款去</div>
      </div>
    </section>
    <section class="sectionCart">
      <div class="sectionTable">
        <table v-if="cartStore.carts.length > 0">
          <thead>
            <tr>
              <th>REMOVE</th>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>SIZE</th>
              <th>QUANTITY</th>
              <th>SUBTOTAL</th>
            </tr>
          </thead>
          <TransitionGroup name="fade" tag="tbody">
            <tr v-for="cart in cartStore.carts" :key="cart.id">
              <td>
                <button
                  @click="cartStore.removeCartItemById(cart.id, cart.size)"
                  class="removeButton"
                >
                  Remove
                </button>
              </td>
              <td><img :src="cart.img" alt="" width="100" height="110" /></td>
              <td>{{ cart.title }}</td>
              <td>NT {{ cart.price }} 元</td>
              <td>{{ cart.size }}</td>
              <td>
                <button
                  @click="cartStore.decreaseCartItemById(cart.id, cart.size)"
                  class="addLeft"
                >
                  -
                </button>
                {{ cart.counter }} 件
                <button
                  @click="cartStore.increaseCartItemById(cart.id, cart.size)"
                  class="addRight"
                >
                  +
                </button>
              </td>
              <td v-if="useKupengRef">
                <div class="textNone">
                  原價 NT {{ cart.counter * cart.price }} 元
                </div>
                <div class="yellow">
                  特價 NT {{ Math.floor(cart.counter * cart.price * 0.7) }} 元
                </div>
              </td>
              <td v-else>價格 NT {{ cart.counter * cart.price }} 元</td>
            </tr>
          </TransitionGroup>
        </table>

        <div v-else class="empty-cart-message">
          <h1>購物車為空，來去逛逛!</h1>
          <br />
          <router-link to="/shop" href="/shop" class="go-to-shop"
            >前往購物商城</router-link
          >
        </div>
      </div>
    </section>
    <section v-if="cartStore.carts.length > 0" class="sectionInputKupeng">
      <div class="sectionInputKupengLayout">
        <div class="inputKupeng">
          <input
            v-model="inputKupengRef"
            type="text"
            placeholder="輸入優惠碼"
          />
          <button @click="useKupengFunction" class="nputKupengButton">
            套用優惠碼
          </button>
        </div>
      </div>
    </section>
    <section class="sectionTotal">
      <div class="sectionTotalLayout">
        <!-- 左側區塊: 清除購物車按鈕 -->
        <button
          v-if="cartStore.carts.length > 0"
          @click="cartStore.clearCartFunction()"
          class="totalLeftButton"
        >
          清除購物車
        </button>

        <div v-else></div>

        <!-- 中間區塊: 顯示購物總價 -->
        <div class="totalPriceContainer">
          <transition name="fade">
            <div v-if="useKupengRef">
              <div class="totalUse">使用了優惠碼</div>
              <div class="totalPriceInfo">
                <div>目前購物車總共 {{ total }} 件商品，</div>
                <div class="totalPriceTop">原本 NT {{ totalPrice }} 元</div>
                <div class="totalPriceBottom">
                  特價 NT {{ Math.floor(totalPrice * 0.7) }} 元
                </div>
              </div>
            </div>
            <div v-else>
              目前購物車總共 {{ total }} 件商品，總共 NT {{ totalPrice }} 元
            </div>
          </transition>
        </div>

        <!-- 右側區塊: 結帳或去商城按鈕 -->
        <div class="checkoutButtonContainer">
          <button @click="copyStepOne" class="checkoutButton">
            {{
              cartStore.cartsHasProductionFunction()
                ? '前去結帳'
                : '前往購物商城'
            }}
          </button>
        </div>
      </div>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
  background-color: #f8f8f8;
  padding: 10px 20px;
  border-radius: 8px;
}

.breadcrumb-nav a {
  color: #333;
  text-decoration: none;
  margin-right: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.breadcrumb-nav a:hover {
  background-color: #ff6f61;
  color: white;
}

.breadcrumb-nav span {
  margin: 0 5px;
  color: #999;
}

.breadcrumb-nav a:last-of-type {
  background-color: transparent;
  font-weight: bold;
  background-color: #eaeaea;
  color: #ff6f61;
}

.cartPageLayout {
  background-image: url('@/assets/pictures/shop03.webp');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.sectionBuyProcess {
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
}

.buyProcessLayout {
  width: 60%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px 0;
}

.processDivOne,
.processDivTwo,
.processDivThree {
  width: 200px;
  height: 100px;
  margin: 20px;
  background-color: #ffffff;
  color: #333;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.processDivOne {
  background-color: #333;
  color: #fff;
}

.sectionCart {
  width: 100vw;
  max-width: 100%;
  background-color: #c4c4c4;
}

.footerHolder {
  height: 0;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
}

.sectionTable {
  display: flex;
  justify-content: center;
  color: black;
}

table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

th,
td {
  padding: 10px;
  border-bottom: solid 1px black;
}

.addLeft {
  margin-right: 10px;
  padding: 10px;
}

.addRight {
  margin-left: 10px;
  padding: 10px;
}

.empty-cart-message {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 200px; /* 調整高度，讓其看起來更居中 */
  background: rgba(0, 0, 0, 0.6);

  font-size: 1.6rem;
  color: #333; /* 柔和的文字顏色 */
  padding: 20px;
  margin: 50px 0;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* 添加陰影效果 */
}

.empty-cart-message h1 {
  color: white;
  font-size: 2.5rem;
  margin: 0;
  animation: fadeIn 1s ease-in-out; /* 渐显动画 */
}

/* 前往購物商城按鈕樣式 */
.go-to-shop {
  display: inline-block;
  padding: 12px 30px;
  background-color: #ff4757; /* 醒目的紅色按鈕 */
  color: white;
  font-size: 1.4rem;
  text-decoration: none; /* 移除下劃線 */
  border-radius: 50px; /* 圓形按鈕 */
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4); /* 陰影讓按鈕有深度 */
  margin-top: 20px;
  cursor: pointer;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    background-color: #e84118; /* 在動畫中途改變顏色 */
  }
}

.go-to-shop:hover {
  background-color: #e84118;
  transform: scale(1.1); /* 懸停時按鈕放大效果 */
  box-shadow: 0 6px 20px rgba(232, 65, 24, 0.6); /* 增強懸停時的陰影效果 */
}

.sectionInputKupeng {
  width: 100vw;
  max-width: 100%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
}

.sectionInputKupengLayout {
  /* background-color: #fff; */
  display: flex;
  justify-content: center;
}

.inputKupeng {
  padding: 20px 0;
  display: flex;
  gap: 10px;
}

.inputKupeng input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.nputKupengButton {
  padding: 10px 20px;
  background-color: #daa520;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.nputKupengButton:hover {
  background-color: #aa0000;
  color: rgb(255, 255, 255);
}

.POA {
  width: 196px;
  position: absolute;
  transform: translate(-50%, -50%);
}

.totalUse {
  background-color: #daa520;
  width: 100px;
}
.totalPrice {
  display: flex;
}

.totalPriceTop {
  text-decoration: line-through;
  width: 120px;
}
.totalPriceBottom {
  background-color: #daa520;
  width: 120px;
}

.removeButton,
.addLeft,
.addRight {
  padding: 8px 12px;
  background-color: #daa520;
  border: none;
  color: rgb(0, 0, 0);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.removeButton:hover,
.addLeft:hover,
.addRight:hover {
  background-color: #aa0000;
  color: #fff;
}

.yellow {
  background-color: #daa520;
}

.textNone {
  text-decoration: line-through;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.sectionTotal {
  width: 100%;
  background-color: #939393;
  padding: 20px;
  display: flex;
  justify-content: center;
}

.sectionTotalLayout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80vw;
  max-width: 1200px;
  flex-wrap: wrap; /* 小螢幕時內容可換行 */
}

.totalLeftButton,
.checkoutButton {
  background-color: black;
  color: white;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.totalLeftButton:hover,
.checkoutButton:hover {
  background-color: #aa0000;
}

.totalPriceContainer {
  text-align: center;
  flex: 1; /* 總價區塊在中間並自適應寬度 */
  margin: 10px 0;
}

.totalPriceInfo {
  display: inline-block;
  text-align: left;
}

.totalPriceTop {
  text-decoration: line-through;
}

.totalPriceBottom {
  background-color: #daa520;
  padding: 5px;
}

.checkoutButtonContainer {
  display: flex;
  justify-content: center;
}

.checkoutButton {
  background-color: #daa520;
  padding: 15px;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.checkoutButton:hover {
  background-color: #aa0000;
  color: white;
}

@media (max-width: 768px) {
  .sectionTotalLayout {
    flex-direction: column; /* 小螢幕上改為垂直排列 */
    align-items: center;
  }

  .totalLeftButton,
  .checkoutButton {
    margin-bottom: 10px; /* 增加按鈕之間的距離 */
  }

  .totalPriceContainer {
    margin-bottom: 20px;
  }

  .empty-cart-message {
    height: 180px;
    font-size: 1.4rem;
    margin: 40px 0;
  }

  .empty-cart-message h1 {
    font-size: 2rem;
  }

  .go-to-shop {
    padding: 10px 25px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .empty-cart-message {
    height: 160px;
    font-size: 1.2rem;
    margin: 30px 0;
  }

  .empty-cart-message h1 {
    font-size: 1.6rem;
  }

  .go-to-shop {
    padding: 8px 20px;
    font-size: 1rem;
  }
}
</style>
