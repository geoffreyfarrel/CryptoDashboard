import { useCoinStore } from '@/stores/coinStore';
import { refDebounced } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

export const useCoinSearch = () => {
  const query = ref('');

  const debouncedQuery = refDebounced(query, 300);

  const coinStore = useCoinStore();

  const { searchResult, isSearching } = storeToRefs(coinStore);

  watch(debouncedQuery, (value) => {
    if (value.trim().length >= 2) {
      coinStore.searchCoins(value);
    }
  });

  return {
    query,
    searchResult,
    isSearching,
  };
};
