import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useSteponeStore = defineStore(
  'stepones',
  () => {
    const stepones = ref([
      {
        id: 1,
        order: '',
        img: './src/assets/imgs/w001.jpg',
        title: '測試用資料',
        category: 'hat',
        star: '★★★★',
        stars: 4,
        price: 0,
        description:
          '粗條燈芯絨；主題繡花，為今年聖誕設計的幾何小圖；男女皆可戴。',
        color: 'orange',
        label: 'Other',
        counter: 1,
        size: 'M',
        kupeng: false,
        email: '',
        name: '',
        telphone: '',
        adress: '',
        message: '',
        d: '',
        year: '',
        month: '',
        date: '',
        hours: '',
        minutes: '',
        seconds: '',
        pay: true,
        complete: false,
      },
    ]);

    // 這個計數器用來做 order 最後 3 碼的計數器
    const counters = ref(1);

    // 更新 stepones 陣列中每個元素的 kupeng 屬性為 true
    function updateMultipleKupengValues() {
      for (let i = 0; i < stepones.value.length; i++) {
        stepones.value[i].kupeng = true;
      }
    }

    return {
      stepones,
      counters,
      updateMultipleKupengValues,
    };
  },
  {
    persist: true,
  }
);
