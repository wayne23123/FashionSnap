import { defineStore } from 'pinia';

export const useFormStore = defineStore('formStore', {
  state: () => ({
    formData: {
      name: '',
      email: '',
      address: '',
    },
  }),
  actions: {
    saveFormData(data) {
      this.formData = data;
    },
  },
});
