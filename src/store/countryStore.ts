import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCountryStore = defineStore('countryStore', () => {
    const country = ref(0);
    const src = ref('');
    return { country, src };
});
