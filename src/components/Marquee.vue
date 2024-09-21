<template>
  <div
    class="marquee-container"
    @mouseenter="pauseMarquee"
    @mouseleave="resumeMarquee"
  >
    <div class="marquee-track" ref="marqueeTrack">
      <p
        v-for="(message, index) in messages"
        :key="index"
        class="marquee-message"
      >
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// 滾動內容
const messages = ref([
  'Flash Sale! Up to 50% off on selected items!',
  'New arrivals are here! Check them out now!',
  'Free shipping on orders over $100!',
  'Limited-time offer: Buy one, get one free!',
]);

const marqueeTrack = ref(null);
let position = ref(0); // 用來儲存當前滾動位置
let animationId = null;
const speed = 1; // 滾動速度

// 開始滾動 Marquee
function startMarquee() {
  const track = marqueeTrack.value;

  function scroll() {
    position.value -= speed;
    if (position.value <= -track.scrollWidth) {
      position.value = track.clientWidth;
    }
    track.style.transform = `translateX(${position.value}px)`;
    animationId = requestAnimationFrame(scroll);
  }

  animationId = requestAnimationFrame(scroll);
}

// 暫停滾動 Marquee
function pauseMarquee() {
  if (animationId) {
    cancelAnimationFrame(animationId); // 停止動畫
    animationId = null;
  }
}

// 恢復滾動 Marquee
function resumeMarquee() {
  if (!animationId) {
    startMarquee(); // 恢復滾動
  }
}

onMounted(() => {
  startMarquee();
});

onUnmounted(() => {
  pauseMarquee();
});
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
  background-color: #333;
  color: white;
  padding: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.marquee-track {
  display: flex;
  white-space: nowrap;
  will-change: transform;
}

.marquee-message {
  margin-right: 50px; /* 每個消息之間的間距 */
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .marquee-message {
    font-size: 1.2rem;
  }
}

@media (max-width: 425px) {
  .marquee-message {
    font-size: 1rem;
  }
}
</style>
