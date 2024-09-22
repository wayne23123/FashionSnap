<script setup></script>

<template>
  <section>
    <div class="section-title">
      <div>
        <div class="title-text-large">
          <div class="border-bottom">FEATURE</div>
        </div>
      </div>
    </div>
    <div class="bgc-img-layout">
      <img
        class="bgc-img"
        src="../assets/pictures/clark-street-qfilterjpg.jpg"
        alt="Background Image"
      />
    </div>
    <div class="div-container">
      <div class="div-layout">
        <div class="div-card bgc-orange">
          <div class="div-card-left">
            <div class="left-img-layout">
              <img
                class="left-img"
                src="../assets/pictures/freestocks.jpg"
                alt="Product Image"
              />
            </div>
          </div>
          <div class="div-card-right">
            <div class="right-title">FashionSnap 是什麼</div>
            <div class="right-text">
              FashionSnap
              是一家充滿活力和創意的網路商城，我們提供時尚的服飾、舒適的鞋子、時尚的帽子等多種產品。
            </div>
          </div>
        </div>
        <div class="div-card bgc-gray">
          <div class="div-card-right">
            <div class="right-title">用戶體驗</div>
            <div class="right-text">
              FashionSnap
              始終將用戶體驗置於首位，不斷優化網站的功能和性能，讓顧客在使用網站時感受更加舒適和流暢。
            </div>
          </div>
          <div class="div-card-left">
            <div class="left-img-layout">
              <img
                class="left-img"
                src="../assets/pictures/heidi.jpg"
                alt="User Experience Image"
              />
            </div>
          </div>
        </div>
        <div class="div-card bgc-orange">
          <div class="div-card-left">
            <div class="left-img-layout">
              <img
                class="left-img"
                src="../assets/pictures/hannah-m.jpg"
                alt="Shopping Convenience Image"
              />
            </div>
          </div>
          <div class="div-card-right">
            <div class="right-title">購物便利性</div>
            <div class="right-text">
              顧客可以輕鬆地在 FashionSnap
              網站上購物，隨時隨地進行線上購物，選擇自己喜愛的產品，快速簡單地下單。
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  max-width: 100%;
  background-color: #262626;
}

.section-title {
  display: flex;
  justify-content: center;
  color: #d69c2f; /* Replace with your yellow color */
}

.title-text-large {
  padding: 30px 0;
  font-size: 36px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}

.border-bottom {
  border-bottom: 1px solid #d69c2f; /* Replace with your yellow color */
}

.bgc-img-layout {
  width: 100%;
  max-width: 1440px;
  height: 1200px;
  position: absolute;
  z-index: 1;
}

.bgc-img {
  width: 100%;
  height: 100%;
}

.div-container {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.div-layout {
  background-color: #333;
  padding: 30px;
  border-radius: 30px;
  z-index: 50;
}

.div-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 15px;
  margin-bottom: 30px;
  border-radius: 15px;
}

.div-card-left,
.div-card-right {
  width: 400px;
}

.left-img-layout {
  width: 100%;
  height: 300px;
}

.left-img {
  width: 100%;
  height: 100%;
}

.right-title {
  display: flex;
  justify-content: center;
  color: #f3f6e0;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.right-text {
  padding: 0 20px;
  font-size: 24px;
  color: #f3f6e0;
}

.bgc-orange {
  background-color: #d69c2f;
}

.bgc-gray {
  background-color: #272727;
}

.div-card:hover {
  transform: scale(1.1);
  transition: all 0.6s ease;
}

@media only screen and (max-width: 700px) {
  section .div-container .div-layout .div-card:hover {
    transform: none;
  }
}
</style>
