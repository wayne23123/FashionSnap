# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

本專案位置結構圖
FashionSnap/
├── public/ # 公共靜態資源
├── src/
│ ├── assets/ # 存放圖片、字體等靜態資源
│ ├── components/ # 存放所有的 Vue 組件
│ │ ├── Header.vue # 頁首組件
│ │ ├── HeroBanner.vue # 橫幅組件
│ │ └── ProductGrid.vue # 商品展示組件
│ ├── views/ # 存放頁面（可能包含多個組件）
│ │ └── Home.vue # 主頁面
│ ├── router/ # Vue 路由
│ │ └── index.js # 路由配置
│ ├── store/ # Vuex 或 Pinia 狀態管理
│ ├── App.vue # 根組件
│ ├── main.js # 專案入口文件
│ └── styles/ # 全局樣式或變數文件
│ └── global.css # 全局 CSS 樣式
├── package.json
├── vite.config.js # Vite 設定
└── README.md
