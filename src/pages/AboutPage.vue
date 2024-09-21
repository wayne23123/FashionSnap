<script setup>
import { ref } from "vue";
import Footer from "../components/Footer.vue";

const showAboutOneRef = ref(false);

window.addEventListener("scroll", function () {
  // 當 scrollY大於0 則 showAboutOneRef 為 true
  showAboutOneRef.value = window.scrollY > 0;
});

const showAboutTwoRef = ref(false);

window.addEventListener("scroll", function () {
  // 當 scrollY大於250 則 showAboutTwoRef 為 true
  showAboutTwoRef.value = window.scrollY > 250;
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
  <section class="sectionAboutUs">
    <div class="textAboutUs"><h1>關於我們</h1></div>
    <div class="imgAboutUsLayout">
      <img class="imgAboutUs" src="../assets/pictures/carl-r.jpg" alt="" />
    </div>
  </section>
  <section class="sectionHolder"></section>
  <section class="sectionAbout">
    <div class="aboutLayout">
      <TransitionGroup name="listUp" tag="div" class="flex">
        <div v-if="showAboutOneRef" class="textAboutLayout">
          <p>
            Wayne's Shopping Spot
            是一家充滿活力和創意的網路商城，我們提供時尚的服飾、舒適的鞋子、時尚的帽子等多種產品。我們的目標是為客戶提供最好的購物體驗，讓他們感到舒適和自信。
          </p>
          <p>
            我們相信每個人都有自己的風格和品味，我們的產品提供多種不同風格和款式，讓每個客戶都能找到最適合自己的產品。我們堅信，時尚應該是讓人們感到自在和自信的，這也是我們產品的核心價值。"
          </p>
        </div>
        <div v-if="showAboutOneRef" class="imgAboutLayout">
          <img class="imgAbout" src="../assets/pictures/openAlert.jpg" alt="" />
        </div>
      </TransitionGroup>
      <br />

      <TransitionGroup name="listUp" tag="div" class="flex">
        <div v-if="showAboutTwoRef" class="imgAboutLayout">
          <img
            class="imgAbout"
            src="../assets/pictures/clark-street-q.jpg"
            alt=""
          />
        </div>
        <div v-if="showAboutTwoRef" class="textAboutLayout">
          <p>
            我們的產品設計風格多樣化，從經典風格到潮流時尚，滿足客戶不同的需求。我們的產品質量優良，我們也提供快速而可靠的配送服務，讓您購物更加方便、快捷。
          </p>
          <p>
            我們將購物視為一種探索和發現的過程，我們的產品設計充滿驚喜和美感，帶給客戶不斷的驚喜和樂趣。我們不斷進行研究和改進，以滿足客戶不斷變化的需求。
          </p>
        </div>
      </TransitionGroup>
    </div>
  </section>
  <transition name="fade" tag="div" v-show="showAboutOneRef">
    <button @mouseenter="toTopFunction" class="toTop">
      <div class="toTopButton">▲ TOP</div>
    </button>
  </transition>
  <section class="footerHolder"></section>
  <Footer />
</template>

<style scoped>
h1 {
  color: #daa520;
  background-color: #00000056;
}

p {
  font-size: 20px;
  text-indent: 2.5rem;
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
.sectionHolder {
  height: 75px;
  width: 100vw;
  max-width: 100%;
  background-color: #916800;
}

.sectionAboutUs {
  height: 200px;
  width: 100vw;
  max-width: 100%;
  background-color: #daa520;
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgAboutUsLayout {
  width: 100vw;
  max-width: 100%;
  height: 200px;
}

.imgAboutUs {
  width: 100%;
  object-position: 0 0;
}

.textAboutUs {
  position: absolute;
  z-index: 10;
}

.sectionAbout {
  width: 100vw;
  max-width: 100%;
  background-color: #916800;
  display: flex;
  justify-content: center;
  min-height: 740px;
}

.textAboutLayout {
  width: 450px;

  color: black;
  padding: 0 50px 0 50px;
}

.imgAboutLayout {
  width: 450px;
}

img {
  width: 100%;
}

.footerHolder {
  height: 100px;
  width: 100vw;
  max-width: 100%;
  background-color: #916800;
}

.toTop {
  top: 550px;
  right: 22px;
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

/* up--------------------------------------------------------------------------- */
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

@media screen and (max-width: 920px) {
  .flex {
    display: flex;
    flex-wrap: wrap;
  }
  .sectionHolder {
    height: 75px;
    width: 100vw;
    max-width: 100%;
    background-color: #141414;
  }

  .sectionAboutUs {
    height: 200px;
    width: 100vw;
    max-width: 100%;
    background-color: #daa520;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgAboutUsLayout {
    width: 100vw;
    max-width: 100%;
    height: 200px;
  }

  .imgAboutUs {
    width: 100%;
    object-position: 0 0;
  }

  .textAboutUs {
    position: absolute;
    z-index: 10;
  }

  .sectionAbout {
    width: 100vw;
    max-width: 100%;
    background-color: #916800;
    display: flex;
    justify-content: center;
    min-height: 740px;
  }

  .textAboutLayout {
    width: 96.7vw;
    max-width: 100%;
    color: black;
    padding: 0 50px 0 50px;
  }

  .imgAboutLayout {
    width: 96vw;
    max-width: 100%;
  }

  img {
    width: 100%;
  }
}
</style>
