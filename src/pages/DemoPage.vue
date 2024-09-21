<script setup>
import { ref, computed } from "vue";
import Footer from "../components/Footer.vue";
import { useDemoStore } from "../stores/demo";
import { useCartStore } from "../stores/cart";

const sectionDebugRef = ref(false);

const demoStore = useDemoStore();
const cartStore = useCartStore();

const copyDemoRef = ref({});

const amountDemo = ref(1);

const sizeRef = ref("M");

// 複製商品資料的函式
function copyDemoFunction(event, demoLast) {
  // 將複製商品資料的參考值改成最後一筆商品資料的內容
  copyDemoRef.value = Object.assign({}, demoLast);
}

// 新增複製的商品到購物車
function addcopyDemoFunction() {
  // 將複製商品的資料以物件的形式加入到空的購物車參考值中
  cartStore.emptyRefs.push({
    id: copyDemoRef.value.id,
    order: copyDemoRef.value.order,
    img: copyDemoRef.value.img,
    title: copyDemoRef.value.title,
    category: copyDemoRef.value.category,
    star: copyDemoRef.value.star,
    stars: copyDemoRef.value.stars,
    price: copyDemoRef.value.price,
    description: copyDemoRef.value.description,
    color: copyDemoRef.value.color,
    label: copyDemoRef.value.label,
    counter: amountDemo.value * 1,
    size: sizeRef.value,
    kupeng: copyDemoRef.value.kupeng,
    email: copyDemoRef.value.email,
    name: copyDemoRef.value.name,
    telphone: copyDemoRef.value.telphone,
    adress: copyDemoRef.value.adress,
    message: copyDemoRef.value.message,
    d: copyDemoRef.value.d,
    year: copyDemoRef.value.year,
    month: copyDemoRef.value.month,
    date: copyDemoRef.value.date,
    hours: copyDemoRef.value.hours,
    minutes: copyDemoRef.value.minutes,
    seconds: copyDemoRef.value.seconds,
    pay: copyDemoRef.value.pay,
    complete: copyDemoRef.value.complete,
  });

  // 以商品 id 為依據進行比較並更新購物車內商品的數量
  cartStore.comparisonByIdFunction();
}
</script>

<template>
  <section class="sectionHolder"></section>
  <section v-show="sectionDebugRef" class="sectionDebug">
    <div>{{ copyDemoRef }}</div>
    <div v-for="demoLast in demoStore.sliceLastDemo" :key="demoLast.id">
      <div>{{ demoLast }}</div>
    </div>
  </section>
  <section class="sectionDemo">
    <div
      @mouseenter="copyDemoFunction($event, demoLast)"
      class="demoLayout"
      v-for="demoLast in demoStore.sliceLastDemoFunction"
      :key="demoLast.id"
    >
      <div class="leftImg">
        <img class="imgSize" :src="demoLast.img" />
        <img class="imgPOR" :src="demoLast.img" />
      </div>
      <div class="rightInfo">
        <div class="demoTitle">商品名稱: {{ demoLast.title }}</div>

        <div class="demoPrice">商品價格: {{ demoLast.price }}</div>
        <div class="demoStar">
          社群評價:
          <div class="demoYellowStar">{{ demoLast.star }}</div>
        </div>
        <div class="formAddButton">
          <select class="sizeRef" name="sizeRef" v-model="sizeRef">
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="S">S</option>
          </select>
          <select class="amountDemo" name="amountDemo" v-model="amountDemo">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <button class="demoButton" @click="addcopyDemoFunction">
            新增至購物車
          </button>
        </div>
        <div class="demoCategory">商品種類: {{ demoLast.category }}</div>
        <div class="demoDescriptionTitle">商品簡介:</div>
        <div class="demoDescription">{{ demoLast.description }}</div>
      </div>
    </div>
  </section>
  <section class="footerHolder"></section>
  <Footer />
</template>

<style scoped>
.sectionDebug {
  display: flex;
  background-color: black;
  color: green;
  width: 100%;
  height: 10vh;
}

.sectionDebug button {
  background-color: green;
}

.noteList {
  background-color: #daa520;
}
.sectionHolder {
  height: 110px;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
}

.sectionDemo {
  width: 100vw;
  max-width: 100%;
  display: flex;
  justify-content: center;
  background-color: #daa520;
}

.demoLayout {
  width: 80vw;
  max-width: 800px;
  /* background-color: #500000; */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.leftImg {
  width: 400px;
  height: 400px;
  background-color: #343333;
  border-radius: 50px;
  overflow: hidden;
}

.imgSize {
  width: 100%;
  height: auto;
  z-index: 12;
}

.imgSize:hover {
  transform: scale(1.3);
  transition: all 0.5s ease;
}

.imgPOR {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 10;
  filter: blur(5px);
  transform: translate(0, -50%);
}

.rightInfo {
  width: 400px;
  height: 400px;
  background-color: #a3a3a3;
  padding: 40px;
  border-radius: 50px;
}

.demoTitle {
  color: black;
  padding: 5px;
}

.demoPrice {
  color: black;
  padding: 5px;
}

.demoStar {
  color: #565656;
  padding: 5px;
  display: flex;
}

.demoYellowStar {
  color: yellow;
  padding-left: 5px;
}

.sizeRef {
  font-size: 18px;
  margin: 5px;
  padding: 4px;
}

.amountDemo {
  font-size: 18px;
  margin: 5px;
  padding: 4px;
}

.demoButton {
  background-color: #daa520;
  color: black;
  padding: 6px 10px 6px 10px;
  margin-left: 5px;
}

.demoButton:hover {
  background-color: #ffb700;
  color: #565656;
  padding: 7px 11px 7px 11px;
}

.demoCategory {
  color: #565656;
}
.demoDescriptionTitle {
  color: black;
  padding: 5px 0;
}

.demoDescription {
  color: black;
}
.footerHolder {
  height: 50px;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
}
</style>
