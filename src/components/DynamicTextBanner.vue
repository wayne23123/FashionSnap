<template>
  <div class="banner">
    <h1 class="txt-main-title">
      <span class="txt-aat">時尚快照</span>
      <span class="txt-rotate">{{ currentText }}</span>
    </h1>
    <h2 class="txt-sub-title">- 時尚快拍 瞬間掌握 -</h2>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const toRotate = [
      '提供快速購物，時尚即刻擁有',
      '讓您輕鬆點擊，掌握時尚風格',
      '提供快購時尚，瞬間擁抱新潮流',
      '讓您捕捉潮流瞬間，打造時尚造型',
    ];
    const period = 2000;
    const currentText = ref(''); // 用於顯示當前的文字
    let loopNum = ref(0);
    let isDeleting = ref(false);
    const typingSpeed = ref(100);

    const tick = () => {
      let i = loopNum.value % toRotate.length;
      let fullTxt = toRotate[i];

      if (isDeleting.value) {
        currentText.value = fullTxt.substring(0, currentText.value.length - 1);
      } else {
        currentText.value = fullTxt.substring(0, currentText.value.length + 1);
      }

      let delta = typingSpeed.value - Math.random() * 50;

      if (isDeleting.value) {
        delta /= 2;
      }

      if (!isDeleting.value && currentText.value === fullTxt) {
        delta = period;
        isDeleting.value = true;
      } else if (isDeleting.value && currentText.value === '') {
        isDeleting.value = false;
        loopNum.value++;
        delta = 500;
      }

      setTimeout(tick, delta);
    };

    onMounted(() => {
      tick(); // 組件掛載後開始輪播
    });

    return {
      currentText,
    };
  },
};
</script>

<style scoped>
.banner {
  text-align: center;
  padding: 50px;
}

.txt-main-title {
  font-size: 2.5rem;
  font-weight: 700;
}

.txt-rotate {
  border-right: 0.08em solid #666;
}

.txt-sub-title {
  font-size: 1.2rem;
  margin-top: 20px;
}

@media (max-width: 870px) {
  .banner {
    min-height: 300px;
  }
}
</style>
