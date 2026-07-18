/// <reference types="unplugin-icons/types/vue3" />

export interface CandleStick {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CoinMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
  market_cap: number;
  total_volume: number;
}

export interface SearchCoinResult {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}
