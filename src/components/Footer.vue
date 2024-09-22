<script setup></script>

<template>
  <section class="sectionFooter">
    <div class="footerLayout">
      <br />
      <br />
      <div class="centerWord">
        <div>聯絡我們 :</div>
      </div>

      <div class="centerWord">
        <a href="https://github.com/wayne23123/" class="padding">
          <img src="../assets/svgs/github.svg" alt="GitHub" />
        </a>
        <router-link to="/" class="padding">
          <img src="../assets/svgs/facebook.svg" alt="Facebook" />
        </router-link>
        <router-link to="/" class="padding">
          <img src="../assets/svgs/instergram.svg" alt="Instagram" />
        </router-link>
        <router-link to="/" class="padding">
          <img src="../assets/svgs/twitter.svg" alt="Twitter" />
        </router-link>
      </div>

      <div class="centerWord">
        <div>© Wayne Lu 2024</div>
      </div>
      <div class="centerWord">
        <div>本網頁僅供學習使用 無任何商業用途</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sectionFooter {
  height: auto; /* 改为 auto 以适应内容 */
  width: 100%;
  background-color: #c4c4c4;
  display: flex;
  justify-content: center;
  padding: 20px 0; /* 增加内边距 */
}

.footerLayout {
  width: 80vw; /* 在小屏幕上使用更宽的比例 */
  max-width: 600px; /* 最大宽度 */
  text-align: center; /* 文字居中 */
}

div {
  color: black;
}

.padding {
  padding: 5px;
}

.centerWord {
  display: flex;
  justify-content: center;
  margin-bottom: 10px; /* 增加元素间距 */
}

img {
  width: 30px; /* 设置图标宽度 */
  height: auto; /* 自适应高度 */
}

img:hover {
  filter: invert(30%) sepia(100%) saturate(2000%) hue-rotate(100deg);
}

/* RWD */
@media only screen and (max-width: 768px) {
  .footerLayout {
    width: 90vw; /* 在小屏幕上使用更宽的比例 */
  }

  img {
    width: 25px; /* 减小图标大小 */
  }
}

@media only screen and (max-width: 480px) {
  .footerLayout {
    width: 95vw; /* 更窄的屏幕使用接近全宽 */
  }

  img {
    width: 20px; /* 进一步减小图标大小 */
  }

  .padding {
    padding: 3px; /* 减小内边距 */
  }
}
</style>
