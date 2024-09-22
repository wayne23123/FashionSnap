<script setup>
import { ref } from 'vue';
import Footer from '../components/Footer.vue';

const showAboutOneRef = ref(false);

window.addEventListener('scroll', function () {
  // 當 scrollY大於0 則 showAboutOneRef 為 true
  showAboutOneRef.value = window.scrollY > 0;
});

const showAboutTwoRef = ref(false);

window.addEventListener('scroll', function () {
  // 當 scrollY大於250 則 showAboutTwoRef 為 true
  showAboutTwoRef.value = window.scrollY > 250;
});

// 當點擊返回頂部時，滾動到頁面頂部
function toTopFunction() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}
</script>

<template>
  <!-- 麵包屑導航 -->
  <nav class="breadcrumb-nav">
    <router-link to="/">首頁</router-link>
    <span>/</span>
    <router-link to="/about">關於我們</router-link>
  </nav>
  <div class="container">
    <div class="wrap">
      <!-- item 1  -->
      <div class="item">
        <div class="pic">
          <img src="../assets/pictures/carl-r.jpg" alt="" />
        </div>
        <div class="txt">
          <h2>關於我們</h2>
          <p>
            我們是一家充滿活力和創意的網路商城，我們提供時尚的服飾、舒適的鞋子、時尚的帽子等多種產品。我們的目標是為客戶提供最好的購物體驗，讓他們感到舒適和自信。
          </p>
        </div>
      </div>
      <!-- item 2  -->
      <div class="item">
        <div class="txt">
          <h2>Fasion Snap</h2>
          <p>
            我們相信每個人都有自己的風格和品味，我們的產品提供多種不同風格和款式，讓每個客戶都能找到最適合自己的產品。我們堅信，時尚應該是讓人們感到自在和自信的，這也是我們產品的核心價值。
          </p>
        </div>
        <div class="pic">
          <img src="../assets/pictures/openAlert.jpg" alt="" />
        </div>
      </div>
      <!-- item 3  -->
      <div class="item">
        <div class="pic">
          <img src="../assets/pictures/clark-street-q.jpg" />
        </div>
        <div class="txt">
          <h2>產品設計</h2>
          <p>
            我們的產品設計風格多樣化，從經典風格到潮流時尚，滿足客戶不同的需求。我們的產品質量優良，我們也提供快速而可靠的配送服務，讓您購物更加方便、快捷。
          </p>
        </div>
      </div>
    </div>
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

.container {
  background: linear-gradient(110deg, #ffffff, #999999);
}

.wrap {
  width: 1200px;
  margin: auto;
}
.item {
  display: flex;
  align-items: center;
  font-family: 'Noto Sans TC', sans-serif;
}
.item h2 {
  font-weight: 900;
  margin-bottom: 1em;
}
.item p {
  font-weight: 300;
  line-height: 1.6;
}
.item .pic {
  width: 55%;
  flex-shrink: 0;
}
.item .pic img {
  width: 100%;
  vertical-align: middle;
}
.item .txt {
  width: 55%;
  flex-shrink: 0;
  padding: 50px 30px;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}
.item > :first-child {
  margin-right: -10%;
}
.item:nth-child(1) .txt {
  background-color: rgba(234, 235, 253, 0.8);
}
.item:nth-child(2) .txt {
  background-color: rgba(180, 240, 227, 0.8);
}
.item:nth-child(3) .txt {
  background-color: rgba(245, 224, 194, 0.8);
}
.item:nth-child(4) .txt {
  background-color: rgba(149, 219, 214, 0.8);
}

/* 媒體查詢：針對手機或小於 768px 的螢幕 */
@media (max-width: 1220px) {
  .container {
  }
  .wrap {
    width: 100%;
  }
  .item {
    flex-direction: column;
    text-align: center;
    padding: 30px 0;
  }

  .item .pic {
    width: 80%;
  }
  .item .txt {
    width: 80%;
    padding: 30px 20px;
  }

  .item > :first-child {
    margin-right: 0;
  }
}
</style>
