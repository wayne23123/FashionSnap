<template>
  <header class="site-header">
    <div class="logo">FashionSnap</div>
    <nav class="nav-menu">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">Cart</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-menu ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-menu a {
  color: white;
  text-decoration: none;
}

.nav-menu a:hover {
  text-decoration: underline;
}
</style>
