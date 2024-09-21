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
      <h3>Product Title</h3>
      <div class="content">
        <p>Product Tagline</p>
        <p>$99.99</p>
      </div>
    </article>
  </div>
</template>

<script>
import { watch } from 'vue';

export default {
  props: {
    mouseX: {
      type: Number,
      required: true,
    },
    mouseY: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
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

    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8a1616;
  height: 500px;
  overflow: hidden;
}

article {
  width: 100%;
  aspect-ratio: 2 / 1.1;
  position: relative;
  overflow: hidden;
  border-radius: 4em;
  background: hsl(0, 0%, 50%);
}

article img {
  position: absolute;
  top: 10%;
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
  transform: translate(calc(-50% + var(--x) * 2), calc(var(--y) * 2));
}

article h3 {
  position: absolute;
  left: 50%;
  top: 10%;
  font-size: 3rem;
  color: white;
  transform: translate(calc(-50% + var(--x) * -0.5), calc(var(--y) * -0.5));
}

.content {
  position: absolute;
  bottom: 0;
  width: 100%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  transform: translate(calc(var(--x) * -0.5), calc(var(--y) * -0.5));
}
</style>
