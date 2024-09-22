<template>
  <div class="container">
    <article>
      <img
        src="../assets/pictures/shop02.webp"
        alt="3D Image Layer 1"
        class="layer1"
      />
      <img
        src="../assets/pictures/buying02.png"
        alt="3D Image Layer 2"
        class="layer2"
      />
    </article>
  </div>
</template>

<script>
import { watch, onMounted } from 'vue';

export default {
  props: {
    mouseX: {
      type: Number,
      default: 0,
    },
    mouseY: {
      type: Number,
      default: 0,
    },
  },

  setup(props) {
    // 初始化圖片位置
    const setInitialPosition = () => {
      const xPercent = props.mouseX / window.innerWidth - 0.5;
      const yPercent = props.mouseY / window.innerHeight - 0.5;

      document.documentElement.style.setProperty('--x', `${xPercent * 20}px`);
      document.documentElement.style.setProperty('--y', `${yPercent * 20}px`);
    };

    // 監聽 mouseX 和 mouseY 的變化
    watch(
      () => [props.mouseX, props.mouseY],
      ([newMouseX, newMouseY]) => {
        const xPercent = newMouseX / window.innerWidth - 0.5;
        const yPercent = newMouseY / window.innerHeight - 0.5;

        // 設置 CSS 變量，控制圖片的位移
        document.documentElement.style.setProperty('--x', `${xPercent * 20}px`);
        document.documentElement.style.setProperty('--y', `${yPercent * 20}px`);
      }
    );

    // 當組件掛載時設置初始位置
    onMounted(() => {
      setInitialPosition();
    });

    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  overflow: hidden;
  background-color: #9cff88;
}

article {
  width: 100%;
  height: 100%;
  aspect-ratio: 2 / 1.1;
  position: relative;
  overflow: hidden;
  background: hsl(0, 0%, 87%);
}

article img {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100%;
  width: 660px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  transition: transform 0.3s ease-out;
}

article .layer1 {
  width: 100%;
  opacity: 0.7;
  transform: translate(calc(-50% + var(--x)), calc(var(--y)));
}

article .layer2 {
  top: 10%;
  transform: translate(calc(-50% + var(--x) * 2), calc(var(--y) * 2));
}
</style>
