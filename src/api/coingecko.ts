import type { CoinMarketData } from '@/typings';
import { fetchJson } from './http';

enum CoinMarketOrder {
  MARKET_CAP_ASC = 'market_cap_asc',
  MARKET_CAP_DESC = 'market_cap_desc',
  VOLUME_ASC = 'volume_asc',
  VOLUME_DESC = 'volume_desc',
  ID_ASC = 'id_asc',
  ID_DESC = 'id_desc',
}

export interface GetCoinMarketsOptions {
  vs_currency: string;
  ids?: string;
  names?: string;
  symbols?: string;
  order?: CoinMarketOrder;
  per_page?: number;
  page?: number;
}

export const getCoinMarkets = async ({
  vs_currency,
  ids,
  names,
  symbols,
  order = CoinMarketOrder.MARKET_CAP_DESC,
  page = 1,
  ...options
}: GetCoinMarketsOptions): Promise<CoinMarketData[]> => {
  let identifierParam: readonly [string, string];
  if (ids) {
    identifierParam = ['ids', ids];
  } else if (names) {
    identifierParam = ['names', names];
  } else if (symbols) {
    identifierParam = ['symbols', symbols];
  } else {
    identifierParam = ['ids', 'btc'];
  }

  const params = new URLSearchParams({
    vs_currency,
    page: String(page),
    order,
  });

  params.set(...identifierParam);
  if (options.per_page) {
    params.set('per_page', String(options.per_page));
  }

  const response = await fetchJson<CoinMarketData[]>(
    import.meta.env.VITE_COIN_GECKO_API_URL + `/coins/markets?${params}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': import.meta.env.VITE_COIN_GECKO_API_KEY,
      },
    },
  );

  return response;
};
