// stores/useCartStore.js
import { defineStore } from 'pinia';

export const useCartStore = defineStore(
  'cart',
  {
    state: () => ({
      cartItems: [],
    }),
    getters: {
      totalPrice(state) {
        return state.cartItems.reduce((total, item) => {
          return total + parseFloat(item.price.slice(1)) * item.quantity;
        }, 0);
      },
      cartCount(state) {
        return state.cartItems.length;
      },
    },
    actions: {
      addToCart(product) {
        const existingItem = this.cartItems.find(
          (item) => item.id === product.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          this.cartItems.push({ ...product, quantity: 1 });
        }
      },
      removeFromCart(index) {
        this.cartItems.splice(index, 1);
      },
      clearCart() {
        this.cartItems = [];
      },
    },
  },
  {
    persist: true,
  }
);
