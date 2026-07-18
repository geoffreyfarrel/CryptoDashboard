import { getCoinMarkets, getSearchCoins, type GetCoinMarketsOptions } from '@/api/coingecko';
import type { CoinMarketData, SearchCoinResult } from '@/typings';
import { defineStore } from 'pinia';
import { ref, shallowRef } from 'vue';
import { useMarketStore } from './marketStore';

const LAST_COIN_KEY = 'crypto-dashboard:lastCoinId';

export const useCoinStore = defineStore('coin', () => {
  const marketStore = useMarketStore();

  const selectedCoin = ref<CoinMarketData | null>(null);
  const coinList = shallowRef<CoinMarketData[]>([]);

  let searchRequestId = 0;
  const searchResult = shallowRef<SearchCoinResult[]>([]);
  const isSearching = ref(false);

  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  const setSelectedCoin = (coin: CoinMarketData | null): void => {
    selectedCoin.value = coin;
  };

  const setCoinList = (coinListData: CoinMarketData[]): void => {
    coinList.value = coinListData;
  };

  const setSearchResult = (searchResultData: SearchCoinResult[]): void => {
    searchResult.value = searchResultData;
  };

  const setLoading = (loading: boolean): void => {
    isLoading.value = loading;
  };

  const setError = (err: Error | null): void => {
    error.value = err;
  };

  const setIsSearching = (searching: boolean): void => {
    isSearching.value = searching;
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

  const searchCoins = async (query: string): Promise<void> => {
    const requestId = ++searchRequestId;
    setIsSearching(true);
    setError(null);

    try {
      const data = await getSearchCoins(query);

      if (requestId !== searchRequestId) return;

      searchResult.value = data;
    } catch (error) {
      if (requestId !== searchRequestId) return; // stale error, ignore
      setError(error as Error);
    } finally {
      if (requestId === searchRequestId) setIsSearching(false);
    }
  };

  return {
    selectedCoin,
    coinList,
    searchResult,
    isLoading,
    isSearching,
    error,
    setCoinList,
    setLoading,
    setError,
    selectCoin,
    fetchCoin,
    searchCoins,
  };
});
