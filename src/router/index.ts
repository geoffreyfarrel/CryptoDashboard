import DashboardPage from '@/view/DashboardPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/', component: DashboardPage }],
});
