import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountryStore = defineStore('countryStore', () => {
    const country = ref(0);
    return { country };
});
