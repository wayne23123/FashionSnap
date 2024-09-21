<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";
import Marquee from "../components/Marquee.vue";
import Carousel from "../components/Carousel.vue";
import CarouselShop from "../components/CarouselShop.vue";
import { useProductionStore } from "../stores/production";

const productionStore = useProductionStore();

const carouselShopShowRef = ref(false);
window.addEventListener("scroll", function () {
  // 當 scrollY大於290 則 carouselShopShowRef 為 true
  carouselShopShowRef.value = window.scrollY > 290;
});

const categoryShowRef = ref(false);
window.addEventListener("scroll", function () {
  // 當 scrollY大於600 則 categoryShowRef 為 true
  categoryShowRef.value = window.scrollY > 600;
});

const listUpShowRef = ref(false);
window.addEventListener("scroll", function () {
  // 當 scrollY大於600 則 categoryShowRef 為 true
  listUpShowRef.value = window.scrollY > 1100;
});

// 當點擊返回頂部時，滾動到頁面頂部
function toTopFunction() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
</script>

<template>
  <section class="sectionHolder"></section>
  <Carousel />
  <section class="sectionHoler40px"></section>
  <Marquee />
  <section class="sectionHoler40px">今日上架的最新商品!</section>
  <section class="sectionCarouselShop">
    <transition name="fade" tag="div">
      <div v-show="carouselShopShowRef"><CarouselShop></CarouselShop></div>
    </transition>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionHoler40px">
    或者依分類挑商品{{ productionStore.searchTerm.value }}
  </section>
  <section class="sectionHoler40px"></section>

  <section class="sectionCategoryTop">
    <div class="categoryLayout">
      <transition name="listRight" tag="div">
        <div v-show="categoryShowRef" class="categoryDivContainer">
          <div
            @mouseenter="productionStore.searchTerm = 'pants'"
            class="categoryDivOne"
          >
            <router-link to="/shop">
              <div class="categoryDivOneText"><h1>褲子</h1></div>
              <img
                class="categoryDivOneImgSize"
                src="../assets/imgs/w008.jpg"
              />
            </router-link>
          </div>
          <div
            @mouseenter="productionStore.searchTerm = 'clothes'"
            class="categoryDivTwo"
          >
            <router-link to="/shop">
              <div class="categoryDivTwoText"><h1>上衣</h1></div>
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w015.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w007.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w016.jpg"
              />
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionCategoryTop">
    <div class="categoryLayout">
      <transition name="listLeft" tag="div">
        <div v-show="categoryShowRef" class="categoryDivContainer">
          <div
            @mouseenter="productionStore.searchTerm = 'shoes'"
            class="categoryDivTwo"
          >
            <router-link to="/shop">
              <div class="categoryDivTwoText"><h1>鞋子</h1></div>
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w002.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w004.jpg"
              />
              <img
                class="categoryDivTwoImgSize"
                src="../assets/imgs/w010.jpg"
              />
            </router-link>
          </div>
          <div
            @mouseenter="productionStore.searchTerm = 'hat'"
            class="categoryDivOne"
          >
            <router-link to="/shop">
              <div class="categoryDivOneText"><h1>帽子</h1></div>
              <img
                class="categoryDivOneImgSize"
                src="../assets/imgs/w006.jpg"
              />
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionHoler40px">
    創造你的風格，從 Wayne's Shopping Spot 開始
  </section>
  <section class="sectionHoler40px"></section>
  <section class="sectionFourCard">
    <div class="fourCardLayout">
      <transition name="listUp" tag="div" class="tableLayout">
        <table v-show="listUpShowRef">
          <thead>
            <tr>
              <th>
                <div class="fourCardDiv">
                  <router-link to="/shop">
                    <div class="fourCardDivImgLayout">
                      <img
                        class="fourCardDivImg"
                        src="../assets/pictures/freestocks.jpg"
                        alt=""
                      />
                    </div>
                  </router-link>
                  <div class="fourCardDivTextLayout">
                    <div class="bgcWhite">用戶體驗：</div>
                    Wayne's Shopping Spot 始終<br />將用戶體驗置於首位，不斷優<br />化網站的功能和性能，讓顧客<br />在使用網站時感受更加舒適和<br />流暢。
                  </div>
                </div>
              </th>
              <th>
                <div class="fourCardDiv">
                  <router-link to="/shop">
                    <div class="fourCardDivImgLayout">
                      <img
                        class="fourCardDivImg"
                        src="../assets/pictures/korie-c.jpg"
                        alt=""
                      />
                    </div>
                  </router-link>
                  <div class="fourCardDivTextLayout">
                    <div class="bgcWhite">多樣性產品：</div>
                    Wayne's Shopping Spot 提供<br />
                    廣泛的產品類別，讓顧客可以<br />
                    在一個地方找到所有的產品，<br />從時尚服飾到家電產品，應有<br />盡有。
                  </div>
                </div>
              </th>
              <th>
                <div class="fourCardDiv">
                  <router-link to="/shop">
                    <div class="fourCardDivImgLayout">
                      <img
                        class="fourCardDivImg"
                        src="../assets/pictures/hanson-l.jpg"
                        alt=""
                      />
                    </div>
                  </router-link>
                  <div class="fourCardDivTextLayout">
                    <div class="bgcWhite">購物便利性：</div>
                    顧客可以 輕鬆地在 Wayne's<br />
                    Shopping Spot 網站上購物，<br />隨時隨地進行線上購物，選擇<br />
                    自己喜愛的產品，快速簡單地<br />下單。
                  </div>
                </div>
              </th>
              <th>
                <div class="fourCardDiv">
                  <router-link to="/shop">
                    <div class="fourCardDivImgLayout">
                      <img
                        class="fourCardDivImg"
                        src="../assets/pictures/heidi.jpg"
                        alt=""
                      />
                    </div>
                  </router-link>
                  <div class="fourCardDivTextLayout">
                    <div class="bgcWhite">優惠促銷：</div>
                    Wayne's Shopping Spot 提供<br />各種優惠活動和促銷方案，讓<br />
                    顧客在購物時享受更多折扣和<br />禮品，提高購物的樂趣。
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </transition>
    </div>
  </section>

  <transition name="fade" tag="div" v-show="carouselShopShowRef">
    <button @mouseenter="toTopFunction" class="toTop">
      <div class="toTopButton">▲ TOP</div>
    </button>
  </transition>
  <Footer />
</template>

<style scoped>
.sectionHolder {
  width: 100vw;
  max-width: 100%;
  height: 90px;
  background-color: #daa520;
}

.sectionHoler40px {
  width: 100vw;
  max-width: 100%;
  height: 40px;
  background-color: #daa520;
  color: black;
  display: flex;
  justify-content: center;
}

.sectionCarouselShop {
  width: 100vw;
  max-width: 100%;
  height: 210px;
  background-color: #daa520;
}

.sectionCategoryTop {
  width: 100vw;
  max-width: 100%;
  height: 200px;
  background-color: #daa520;
  overflow: hidden;
}

.categoryDivContainer {
  display: flex;
  justify-content: space-evenly;
}

.categoryDivOne {
  height: 200px;
  width: 232px;
  background-color: white;
  overflow: hidden;
}

.categoryDivOneImgSize {
  width: 100%;
  height: auto;
}

.categoryDivOneText {
  position: absolute;
  height: 200px;
  width: 232px;
  background-color: #00000033;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  color: #fff;
}

.categoryDivOneImgSize:hover {
  transform: scale(1.2);
  transition: all 1s ease;
}

.categoryDivTwo {
  height: 200px;
  width: 50vw;
  background-color: white;
  overflow: hidden;
}

.categoryDivTwoText {
  position: absolute;
  height: 200px;
  width: 50vw;
  background-color: #00000033;
  z-index: 10;
  pointer-events: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.categoryDivTwoImgSize {
  width: auto;
  height: 100%;
}

.categoryDivTwoImgSize:hover {
  transform: scale(1.2);
  transition: all 1s ease;
}

.sectionFourCard {
  width: 100vw;
  max-width: 100%;
  height: 350px;
  background-color: #daa520;
}

.tableLayout {
  display: flex;
  justify-content: center;
}

table {
  overflow-x: auto;
  white-space: nowrap;
}

.fourCardDiv {
  width: 200px;
  height: 290px;
  background-color: #c4c4c4;
  border-radius: 15px;
}

.fourCardDivImgLayout {
  width: 200px;
  height: 130px;
  overflow: hidden;
}

.fourCardDivImg {
  width: 100%;
}

.fourCardDivTextLayout {
  color: black;
  width: 200px;
}

.toTop {
  top: 550px;
  right: 50px;
  position: fixed;
  z-index: 200;
  background-color: #6f0202;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.toTopButton {
  color: white;
  pointer-events: none;
}

th {
  padding: 5px;
}

.bgcWhite {
  background-color: #fff;
  border: 1px solid black;
}

/* 控制TransitionGroup------------------------------------------------------------------------------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
/* left--------------------------------------------------------------------------------- */

.listLeft-enter-active,
.listLeft-leave-active {
  transition: all 3s ease;
}

.listLeft-enter-from {
  transform: translateX(-100%);
}
.listLeft-leave-to {
  transform: translateX(100%);
}

.listLeft-leave-active,
.listLeft-enter-active {
}

/* right--------------------------------------------------------------------------------- */

.listRight-enter-active,
.listRight-leave-active {
  transition: all 3s ease;
}

.listRight-enter-from {
  transform: translateX(100%);
}
.listRight-leave-to {
  transform: translateX(-100%);
}

.listRight-leave-active,
.listRight-enter-active {
}

/* up--------------------------------------------------------------------------------- */

.listUp-enter-active,
.listUp-leave-active {
  transition: all 3s ease;
}

.listUp-enter-from {
  transform: translateY(100%);
  opacity: 0;
}
.listUp-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

@media screen and (max-width: 865px) {
  .tableLayout {
    justify-content: flex-start;
  }
}
</style>
