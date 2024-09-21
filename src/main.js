import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import './styles/reset.css';

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');
