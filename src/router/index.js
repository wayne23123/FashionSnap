import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ShopPage from '../pages/ShopPage.vue';
import DemoPage from '../pages/DemoPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import CartPage from '../pages/CartPage.vue';
import PayPage from '../pages/PayPage.vue';
import FormPage from '../pages/FormPage.vue';
import ProductDetailPage from '../pages/ProductDetailPage.vue'; // 新增商品詳情頁面

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopPage,
    },
    {
      path: '/demo',
      name: 'demo',
      component: DemoPage,
    },
    {
      path: '/demo/:id', // 使用動態路由 :id 來捕獲產品 id
      name: 'demo',
      component: DemoPage,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage,
    },
    {
      path: '/form',
      name: 'form',
      component: FormPage,
    },
    {
      path: '/pay',
      name: 'pay',
      component: PayPage,
    },
    {
      path: '/product/:id',
      name: 'product-detail',
      component: ProductDetailPage,
      props: true,
    },
  ],
});

export default router;
