<script setup>
import { ref } from 'vue';
import Footer from '../components/Footer.vue';
import { useSteponeStore } from '../stores/stepone';
import { usePayStore } from '../stores/pay';

const sectionDebugRef = ref(false);

const steponeStore = useSteponeStore();
const payStore = usePayStore();

const inputEmailRef = ref('');

function inputEmail(e) {
  inputEmailRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 email 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].email = inputEmailRef.value;
  }
}

const inputNameRef = ref('');

function inputName(e) {
  inputNameRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 name 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].name = inputNameRef.value;
  }
}

const inputTelphoneRef = ref('');

function inputTelphone(e) {
  inputTelphoneRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 telphone 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].telphone = inputTelphoneRef.value;
  }
}

const inputinputAdressRef = ref('');

function inputinputAdress(e) {
  inputinputAdressRef.value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 adress 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].adress = inputinputAdressRef.value;
  }
}

function inputinputMessage(e) {
  const value = e.target.value;
  // 用 for 迴圈把抓到 input 的值寫進 stepones 裡面每一筆資料的 message 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].message = value;
  }
}

let d = new Date();
let year = d.getUTCFullYear();
let month = d.getMonth() + 1;
let date = d.getDate();
let hours = d.getHours();
let minutes = d.getMinutes();
let seconds = d.getSeconds();

let yearStr = String(year).padStart(4, '0'); // 將年份轉成 4 位數字，不足補零
let monthStr = String(month).padStart(2, '0'); // 將月份轉成 2 位數字，不足補零
let dateStr = String(date).padStart(2, '0'); // 將日期轉成 2 位數字，不足補零
let hoursStr = String(hours).padStart(2, '0'); // 將小時轉成 2 位數字，不足補零
let minutesStr = String(minutes).padStart(2, '0'); // 將分鐘轉成 2 位數字，不足補零
let secondsStr = String(seconds).padStart(2, '0'); // 將秒數轉成 2 位數字，不足補零
// let counterStr = String(counter).padStart(3, "0"); // 將計數器轉成 3 位數字，不足補零
// let counterStr = String(counter).padStart(3, "0");

function setArrayTime() {
  // 用 for 迴圈把抓到 date 的值寫進 stepones 裡面每一筆資料的 date 屬性
  for (let i = 0; i < steponeStore.stepones.length; i++) {
    steponeStore.stepones[i].d = d;
    steponeStore.stepones[i].year = year;
    steponeStore.stepones[i].month = month;
    steponeStore.stepones[i].date = date;
    steponeStore.stepones[i].hours = hours;
    steponeStore.stepones[i].minutes = minutes;
    steponeStore.stepones[i].seconds = seconds;
    steponeStore.stepones[i].order =
      monthStr +
      dateStr +
      hoursStr +
      minutesStr +
      secondsStr +
      String(steponeStore.counters).padStart(3, '0');
  }
  steponeStore.counters++;
}

// 此函數檢查 email 格式是否正確
function checkEmailFormat(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// 當滑鼠移入付款去時 先將 pays 清空後把 stepones 的資料全部堆進 pays
function pushPayFunction() {
  if (inputNameRef.value === '') {
    alert('請輸入姓名');
    return;
  }

  if (inputTelphoneRef.value === '') {
    alert('請輸入電話');
    return;
  }

  if (!checkEmailFormat(inputEmailRef.value)) {
    alert('請確認Email格式');
    return;
  }

  if (inputinputAdressRef.value === '') {
    alert('請輸入地址');
    return;
  }
  // 設定時間陣列
  setArrayTime();
  // 清空 pays 數組
  payStore.pays.splice(0);
  // 將 stepones 陣列的所有元素推送到 pays 數組中
  payStore.pays.push(...steponeStore.stepones);
}
</script>

<template>
  <div class="formPageLayout">
    <section class="sectionBuyProcess">
      <div class="buyProcessLayout">
        <div class="processDivOne">step1.確認購物清單</div>
        <div class="processDivTwo">step2.填寫購買資料</div>
        <div class="processDivThree">step3.付款去</div>
      </div>
    </section>
    <section v-show="sectionDebugRef" class="sectionDebug">
      <div>{{ steponeStore.stepones }}</div>
    </section>
    <section class="sectionCart">
      <div class="formLayout">
        <div class="formWidth">
          <br />

          <div>姓名:</div>
          <input @input="inputName" type="text" class="formMargin" />

          <div>電話:</div>
          <input @input="inputTelphone" type="number" class="formMargin" />

          <div>email:</div>
          <input @input="inputEmail" type="email" class="formMargin" />

          <div>地址:</div>
          <input @input="inputinputAdress" type="text" class="formMargin" />
          <div>留言 (有什麼想告訴我們的請備註在此)</div>
          <textarea
            @input="inputinputMessage"
            cols="30"
            rows="10"
            class="formMargin"
          ></textarea>
          <div class="formButtonLayout">
            <router-link to="/cart" class="goCart">上一步</router-link>
            <router-link @mouseenter="pushPayFunction" to="/pay" class="goPay"
              >付款去</router-link
            >
          </div>

          <div v-show="sectionDebugRef">{{ payStore.pays }}</div>
        </div>
      </div>
    </section>
  </div>

  <Footer />
</template>

<style scoped>
.formPageLayout {
  background-image: url('@/assets/pictures/shop03.webp');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.sectionBuyProcess {
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
}

.buyProcessLayout {
  width: 60%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.processDivOne,
.processDivTwo,
.processDivThree {
  width: 200px;
  height: 100px;
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

.processDivTwo {
  background-color: #333;
  color: #fff;
}

.sectionCart {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
}

.formLayout {
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.formWidth {
  width: 100%;
}

.formMargin {
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  margin-top: 10px;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #f5a623;
}

textarea {
  resize: none;
}

.formButtonLayout {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

a {
  display: inline-block;
  padding: 10px 20px;
  background-color: #f5a623;
  color: white;
  border-radius: 5px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

a:hover {
  background-color: #e68a00;
}

.footerHolder {
  height: 100px;
  width: 100%;
  background-color: #f5a623;
}

/* 隱藏數字輸入的上下箭頭 */
input[type='number'] {
  -moz-appearance: textfield;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
