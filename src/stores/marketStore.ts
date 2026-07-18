import type { CandleStick } from '@/typings';
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';

const MAX_LIVE_TICKS = 1000; // Maximum number of live ticks to keep

export const useMarketStore = defineStore('market', () => {
  const currentSymbol = ref('BTCUSD');
  const historicalData = shallowRef<CandleStick[]>([]);
  const liveTicks = shallowRef<CandleStick[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const setSymbol = (symbol: string): void => {
    currentSymbol.value = symbol;
  };

  const setHistoricalData = (data: CandleStick[]): void => {
    historicalData.value = data;
  };

  const addLiveTickBatch = (ticks: CandleStick[]): void => {
    let updated = [...liveTicks.value, ...ticks];
    if (updated.length > MAX_LIVE_TICKS) {
      updated = updated.slice(-MAX_LIVE_TICKS);
    }

    liveTicks.value = updated;
  };

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const setError = (err: Error | null): void => {
    error.value = err;
  };

  return {
    currentSymbol,
    historicalData,
    liveTicks,
    isLoading,
    error,
    setSymbol,
    setHistoricalData,
    addLiveTickBatch,
    setLoading,
    setError,
  };
});
