import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCartStore = defineStore(
  'carts',
  () => {
    const carts = ref([]);

    // 用來跟 carts 比較是否已經存在購物車
    const emptyRefs = ref([]);

    // 將 emptyRefs 中的商品資料與 carts 中的商品資料進行比較，
    // 如果有相同的商品，則將數量加總起來，
    // 如果沒有相同的商品，則將商品資料加入到 carts 中
    function comparisonByIdFunction() {
      // 用forEach對 emptyRefs 陣列中的每筆資料進行比較
      emptyRefs.value.forEach((emptyRef) => {
        const existingProduct = this.carts.find(
          (product) =>
            product.id == emptyRef.id && product.size == emptyRef.size
          // 判斷只有當 product.id 和 product.size 都相等 emptyRef 時才返回 true
        );
        if (existingProduct) {
          console.log(1);
          console.log(emptyRef);
          // 使用 Number() 確保 counter 是數字，避免字串拼接
          existingProduct.counter += Number(emptyRef.counter);
        } else {
          // 如果不存在，則將這筆資料加入到 carts 陣列中
          this.carts.push({
            id: emptyRef.id,
            order: emptyRef.order,
            img: emptyRef.img,
            title: emptyRef.title,
            category: emptyRef.category,
            star: emptyRef.star,
            stars: emptyRef.stars,
            price: emptyRef.price,
            description: emptyRef.description,
            color: emptyRef.color,
            label: emptyRef.label,
            counter: emptyRef.counter,
            size: emptyRef.size, // 新增 size 屬性
            kupeng: emptyRef.kupeng,
            email: emptyRef.email,
            name: emptyRef.name,
            telphone: emptyRef.telphone,
            adress: emptyRef.adress,
            message: emptyRef.message,
            d: emptyRef.d,
            year: emptyRef.year,
            month: emptyRef.month,
            date: emptyRef.date,
            hours: emptyRef.hours,
            minutes: emptyRef.minutes,
            seconds: emptyRef.seconds,
            pay: emptyRef.pay,
            complete: emptyRef.complete,
          });
        }
      });

      emptyRefs.value = [];
      // 將 emptyRefs 清空，因為商品已經加入到 carts 中了
    }

    // 用來清空購物車
    function clearCartFunction() {
      carts.value = [];
    }

    // 用來判斷購物車裡面有無商品,有則回傳 true
    function cartsHasProductionFunction() {
      return carts.value && carts.value.length > 0;
    }

    // 計算購物車裡的商品總價格
    function calculateTotalPrice() {
      let sum = 0;
      carts.value.forEach((product) => {
        sum += product.price * product.counter;
      });
      totalPrice.value = sum;
    }

    // 根據商品 id 與尺寸來移除購物車裡的商品
    function removeCartItemById(id, size) {
      const index = carts.value.findIndex(
        (product) => product.id === id && product.size === size
      );
      if (index !== -1) {
        carts.value.splice(index, 1);
      }
    }

    // 根據商品 id 與尺寸來增加購物車裡的商品數量
    function increaseCartItemById(id, size) {
      const product = carts.value.find(
        (product) => product.id == id && product.size == size
      );
      if (product) {
        product.counter++;
      }
    }

    // 根據商品 id 與尺寸來減少購物車裡的商品數量
    function decreaseCartItemById(id, size) {
      const product = carts.value.find(
        (product) => product.id === id && product.size === size
      );
      if (product) {
        if (product.counter > 1) {
          product.counter--;
        } else {
          removeCartItemById(id, size);
        }
      }
    }

    return {
      carts,
      emptyRefs,
      comparisonByIdFunction,
      clearCartFunction,
      calculateTotalPrice,
      removeCartItemById,
      increaseCartItemById,
      decreaseCartItemById,
      cartsHasProductionFunction,
    };
  },
  {
    persist: true,
  }
);
