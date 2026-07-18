import AlertsPage from '@/view/AlertsPage.vue';
import DashboardPage from '@/view/DashboardPage.vue';
import IndicatorsPage from '@/view/IndicatorsPage.vue';
import MarketsPage from '@/view/MarketsPage.vue';
import NewsPage from '@/view/NewsPage.vue';
import PortfolioPage from '@/view/PortfolioPage.vue';
import TradePage from '@/view/TradePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: DashboardPage },
    { path: '/markets', component: MarketsPage },
    { path: '/portfolio', component: PortfolioPage },
    { path: '/trade', component: TradePage },
    { path: '/indicators', component: IndicatorsPage },
    { path: '/alerts', component: AlertsPage },
    { path: '/news', component: NewsPage },
  ],
});
