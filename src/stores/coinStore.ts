import { getCoinMarkets, type GetCoinMarketsOptions } from '@/api/coingecko';
import type { CoinMarketData } from '@/typings';
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { useMarketStore } from './marketStore';

const LAST_COIN_KEY = 'crypto-dashboard:lastCoinId';

export const useCoinStore = defineStore('coin', () => {
  const marketStore = useMarketStore();

  const selectedCoin = ref<CoinMarketData | null>(null);
  const coinList = shallowRef<CoinMarketData[]>([]);
  const isLoading = ref(false);
  const error = ref<Error | null>(null);
  const searchQuery = ref('');
  const searchResult = ref<CoinMarketData[]>([]);
  const isSearching = ref(false);

  const setSelectedCoin = (coin: CoinMarketData | null): void => {
    selectedCoin.value = coin;
  };

  const setCoinList = (coinListData: CoinMarketData[]): void => {
    coinList.value = coinListData;
  };

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const setError = (err: Error | null): void => {
    error.value = err;
  };

  const fetchCoin = async (
    ids?: string,
    vs_currency?: string,
    options?: GetCoinMarketsOptions,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const [data] = await getCoinMarkets({ ids, vs_currency, ...options });
      setSelectedCoin(data ?? null);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoinList = async (
    per_page: number = 10,
    page: number = 1,
    query?: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCoinMarkets({ per_page, page, names: query });
      setCoinList(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const selectCoin = (coin: CoinMarketData): void => {
    setSelectedCoin(coin);
    localStorage.setItem(LAST_COIN_KEY, coin.id);
    marketStore.setSymbol(`${coin.symbol.toUpperCase()}USD`);
  };

  const initialId = localStorage.getItem(LAST_COIN_KEY) ?? 'bitcoin';
  fetchCoin(initialId).then(() => {
    if (error.value) {
      fetchCoin('bitcoin');
    }
  });

  return {
    selectedCoin,
    coinList,
    isLoading,
    error,
    setCoinList,
    setLoading,
    setError,
    selectCoin,
    fetchCoin,
  };
});
