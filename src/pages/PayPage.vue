<script setup>
import { ref, computed } from 'vue';
import Footer from '../components/Footer.vue';
import { usePayStore } from '../stores/pay';
import { useAdminCartStore } from '../stores/admincart';
import { useCartStore } from '../stores/cart';

const sectionDebugRef = ref(false);

const cartStore = useCartStore();
const payStore = usePayStore();
const adminCartStore = useAdminCartStore();

// 使用 computed 計算購物車中的商品數量總和
const cartsTotalCounter = computed(() => {
  return payStore.pays.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    return acc + cur.counter;
  }, 0);
});

// 使用 computed 計算購物車中商品的價格總和
const cartsTotalPrice = computed(() => {
  return payStore.pays.reduce((acc, cur) => {
    // reduce 方法中的第一個參數 acc 表示累加器，也就是上一次累加後的结果
    // reduce 方法中的第二個參數 cur 表示當前正在循環的元素
    // cur.counter * cur.price 表示當前商品的價格
    return acc + cur.counter * cur.price;
  }, 0);
});

const payCheckRef = ref(false);

// 展示付款成功;
function sendOrderFunction() {
  payStore.updateMultiplePayValues();
  payCheckRef.value = true;
  pushAdminCart();
  cartStore.clearCartFunction();
  let message = '付款成功!  感謝您的購買  您的訂單:\n';
  for (let pay of payStore.pays) {
    message += `商品名：${pay.title}，數量：${pay.counter} 個\n`;
  }
  window.alert(message);
}

// 使用 JSON.stringify() 方法將 payStore.pays 轉換為字符串，再使用JSON.parse()方法將字符串轉換成一個新的陣列 paysCopy。
// 這樣就創建一個全新與原陣列無關的陣列
function pushAdminCart() {
  const paysCopy = JSON.parse(JSON.stringify(payStore.pays));
  adminCartStore.admincarts.push(...paysCopy);
}
</script>

<template>
  <div class="payPageLayout">
    <section class="sectionBuyProcess">
      <div class="buyProcessLayout">
        <div class="processDivOne">step1.確認購物清單</div>
        <div class="processDivTwo">step2.填寫購買資料</div>
        <div class="processDivThree">step3.付款去</div>
      </div>
    </section>
    <section v-show="sectionDebugRef" class="sectionDebug">
      <div>pays的狀態{{ payStore.pays }}</div>
    </section>
    <section class="sectionPay">
      <div class="payLayout">
        <div class="payCard">
          <table>
            <tr>
              <th>品項</th>
              <th>尺寸</th>
              <th>數量</th>
              <th>單價</th>
            </tr>
            <tr v-for="pay in payStore.pays" :key="pay.key">
              <td>{{ pay.title }}</td>
              <td>{{ pay.size }}</td>
              <td>{{ pay.counter }}</td>
              <td v-if="payStore.pays[0].kupeng">
                <div class="noneText">{{ pay.price * pay.counter }}</div>
                <div class="yellowMarkPrice">
                  {{ Math.floor(pay.price * pay.counter * 0.7) }}
                </div>
              </td>
              <td v-else="payStore.pays[0].kupeng">
                <div>{{ pay.price * pay.counter }}</div>
              </td>
            </tr>
          </table>
          <div>
            <div v-show="payStore.pays[0].kupeng">
              <div class="useKupeng yellowMark">使用了優惠券!</div>
            </div>
            <div v-if="payStore.pays[0].kupeng">
              <div class="cartsTotalCounter">
                總共 {{ cartsTotalCounter }} 件商品

                <div>
                  <div class="noneText">原價 NT {{ cartsTotalPrice }} 元</div>
                  <div class="yellowMark">
                    特價 NT {{ Math.floor(cartsTotalPrice * 0.7) }} 元
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="cartsTotal">
                <div>總共 {{ cartsTotalCounter }} 件商品</div>
                <div>總共 NT {{ cartsTotalPrice }} 元</div>
              </div>
            </div>
          </div>

          <div v-for="(pay, index) in payStore.pays" :key="index">
            <div v-if="index === 0" class="formPadding">
              Email: {{ pay.email }}
            </div>
            <div v-if="index === 0" class="formPadding">
              姓名: {{ pay.name }}
            </div>
            <div v-if="index === 0" class="formPadding">
              收件人電話: {{ pay.telphone }}
            </div>
            <div v-if="index === 0" class="formPadding">
              收件人地址: {{ pay.adress }}
            </div>
            <div v-if="index === 0" class="formPadding payCheck">
              付款狀態:
              <div v-if="payCheckRef">
                付款成功,感謝您的購買,我們會盡快將商品寄出
              </div>
              <div v-else>尚未付款</div>
            </div>
          </div>
          <div v-if="payCheckRef">
            <router-link to="/shop">回到商城繼續逛逛</router-link>
          </div>
          <div v-else class="goShop">
            <router-link to="/form">上一步</router-link>
            <button @click="sendOrderFunction" class="a">送出訂單</button>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<style scoped>
.payPageLayout {
  background-image: url('@/assets/pictures/shop03.webp');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.sectionBuyProcess {
  width: 100vw;
  max-width: 100%;
  /* background-color: #f5a623; */
  display: flex;
  justify-content: center;
  padding: 20px 0;
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
}

.processDivThree {
  background-color: #333;
  color: white;
}

.sectionPay {
  width: 100%;
  /* background-color: #f5a623; */
  padding: 20px;
  display: flex;
  justify-content: center;
}

.payLayout {
  width: 100%;
  max-width: 600px;
}

.payCard {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.payCard table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f7f7f7;
  font-weight: bold;
}

td {
  border-top: solid 1px gray;
}

.useKupeng {
  margin-top: 10px;
  padding: 10px;
  background-color: #ffe082;
  border-radius: 5px;
  color: #333;
}

.yellowMarkPrice,
.yellowMark {
  background-color: #f5a623;
  color: white;
  padding: 5px;
  border-radius: 5px;
}

.cartsTotalCounter,
.cartsTotal {
  margin: 20px 0;
  padding: 10px;
  background-color: #fafafa;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
}

.noneText {
  text-decoration: line-through;
  color: #999;
}

.formPadding {
  margin: 10px 0;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
}

a,
button {
  background-color: #f5a623;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

a:hover,
button:hover {
  background-color: #e68a00;
}

.payCheck {
  display: flex;
  margin-top: 10px;
}

.goShop {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.footerHolder {
  height: 60px;
  background-color: #f5a623;
}
</style>
