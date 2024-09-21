<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "../stores/cart";
import { useProductionStore } from "../stores/production";

const cartStore = useCartStore();
const productionStore = useProductionStore();

// cartShowRef 控制右上角小購物車開關
const cartShowRef = ref(false);

function mouseEnterShowCart() {
  if (window.innerWidth > 605) {
    cartShowRef.value = true;
  }
}
function mouseEnterNoShowCart() {
  cartShowRef.value = false;
}

// 當 carts 陣列中友值時則 cartsHasProduction 為 true
const cartsHasProduction = computed(() => {
  return cartStore.carts.length > 0;
});

// 使用 computed 計算購物車中的商品數量總和
const cartsTotalCounter = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 使用 computed 計算購物車中商品的價格總和
const cartsTotalPrice = computed(() => {
  return cartStore.carts.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});
</script>

<template>
  <section class="header">
    <router-link to="/" class="none"
      ><div class="svg"><img src="../assets/svgs/wss.svg" /></div
    ></router-link>
    <div class="navbar">
      <router-link to="/" class="router importSVG"
        ><div class="svg">
          <img src="../assets/svgs/home.svg" />Home
        </div></router-link
      >
      <router-link
        to="/shop"
        class="router importSVG"
        @mouseenter="productionStore.searchTerm = ''"
        ><div class="svg">
          <img src="../assets/svgs/shop.svg" />Shop
        </div></router-link
      >
      <router-link to="/about" class="router"> ✒About</router-link>
      <router-link
        @mouseenter="mouseEnterShowCart"
        to="/cart"
        :class="{ 'has-items': cartsHasProduction }"
        class="router importSVG"
      >
        <div class="svg">
          <img src="../assets/svgs/cart.svg" /> Cart({{ cartsTotalCounter }})
        </div></router-link
      >
      <router-link to="/login" class="router"><div>✎Login</div> </router-link>
    </div>
  </section>
  <transition name="fade">
    <div v-show="cartsHasProduction" class="redPlus">✚</div>
  </transition>

  <transition name="fade">
    <div v-show="cartShowRef" class="fakeCart">
      <div class="cartTop">
        <div class="cartTriangle"></div>
      </div>
      <div class="cartEmpty">
        <TransitionGroup name="fade" tag="div">
          <div
            v-for="cart in cartStore.carts.slice(0, 8)"
            :key="cart.id"
            class="cartEmptyTitle"
          >
            商品: {{ cart.title }} size: {{ cart.size }} 數量:
            {{ cart.counter }} 件
            <button
              @click="cartStore.removeCartItemById(cart.id)"
              class="cartEmptyTopButton"
            >
              刪除商品
            </button>
          </div>
        </TransitionGroup>
        <router-link v-if="cartStore.carts.length > 8" to="/cart">
          到購物車查看更多商品...
        </router-link>
        <hr />
        <div class="cartEmptyTop">
          <div>
            目前購物車總共 {{ cartsTotalCounter }} 件商品，總共 NT
            {{ cartsTotalPrice }} 元
            <button
              @click="cartStore.clearCartFunction()"
              class="cartEmptyTopButton"
            >
              刪除全部商品
            </button>
          </div>
        </div>
        <router-link to="/cart" class="goCart">結帳去</router-link>
      </div>
      <div @mouseenter="mouseEnterNoShowCart" class="fakebottom">
        <div class="fakebottomText">︽</div>
      </div>

      <div @mouseenter="mouseEnterNoShowCart" class="fakeright">.</div>
      <div @mouseenter="mouseEnterNoShowCart" class="fakeleft">.</div>
    </div>
  </transition>
</template>

<style scoped>
.header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  max-width: 100%;
  z-index: 200;
  font-size: 24px;
  background-color: #ddd;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 75px;
}
.router {
  padding: 15px;
}

.importSVG {
  bottom: 6px;
}

.has-items {
  /* 當有商品時的樣式 */
  color: red;
  padding: 15px;
  transition: all 0.75s ease;
}

.navbar {
  display: flex;
}

a.router-link-exact-active {
  color: rgb(0, 183, 0);
}

a:hover {
  color: rgb(0, 144, 0);
  transition: all 0.4s ease;
}

.svg:hover {
  transition: all 0.4s ease;
  filter: invert(30%) sepia(100%) saturate(500%) hue-rotate(100deg);
}

.redPlus {
  width: 100px;
  height: 100px;
  z-index: 300;
  color: red;
  position: fixed;
  right: 40px;
  font-size: 30px;
  pointer-events: none;
}

.fakeCart {
  position: fixed;
  z-index: 201;
  right: 80px;
  top: 80px;
  /* background-color: #8a0202; */
}

.fakebottom {
  color: red;
  /* background-color: green */
}

.fakebottomText {
  font-size: 26px;
}

.fakeleft {
  /* background-color: green; */
  position: relative;
  height: 1400px;
  left: -520px;

  top: -900px;
}

.fakeright {
  display: flex;
  justify-content: flex-end;
  /* background-color: green; */
  position: relative;
  left: 250px;
}

.cartTop {
  display: flex;
  justify-content: flex-end;
  right: 40px;
}

.cartTriangle {
  position: relative;
  width: 40px;
  height: 40px;
  top: 20px;
  transform: rotate(225deg);
  background-color: #c4c4c4;
  z-index: 210;
  border-right: solid 2px black;
  border-bottom: solid 2px black;
}

.cartEmptyTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #c4c4c4;
  z-index: 215;
}
.cartEmpty {
  background-color: #c4c4c4;
  color: black;
  padding: 20px;
  border-radius: 15px;
  border: solid 2px black;
  z-index: 202;
}

.cartEmptyTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cartEmptyTopButton {
  margin: 10px 15px 0px 10px;
  padding: 10px;

  background-color: #000000;
  color: white;
}

.cartEmptyTopButton:hover {
  background-color: #aa0000;
  color: black;
  transition: all 0.5s ease;
}

.goCart {
  background-color: #daa520;
  padding: 5px;
}

/* test---------------------------------------------------------------------------------------------------- */

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
/* test---------------------------------------------------------------------------------------------------- */

@media screen and (max-width: 755px) {
  .router {
    padding: 0;
  }

  .redPlus {
    width: 100px;
    height: 100px;
    z-index: 300;
    color: red;
    position: fixed;
    right: 1px;
    font-size: 20px;
    pointer-events: none;
  }
}

@media screen and (max-width: 605px) {
  .header {
    height: 75px;
    display: flex;
    flex-wrap: wrap;
  }

  .none {
    transform: scale(0.3);
    height: 10px;
    transition: all 0.4s ease;
  }
  .redPlus {
    color: #ddd;
    pointer-events: none;
  }
}
</style>
