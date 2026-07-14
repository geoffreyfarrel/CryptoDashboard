<script lang="ts" setup>
import type { Component } from 'vue';
import IconLayoutDashboard from '~icons/tabler/layout-dashboard';
import IconChartLine from '~icons/tabler/chart-line';
import IconWallet from '~icons/tabler/wallet';
import IconTwoWayArrowsLine from '~icons/clarity/two-way-arrows-line';
import IconChartBar from '~icons/ph/chart-bar';
import IconBellOutline from '~icons/mdi/bell-outline';
import IconNews from '~icons/tabler/news';
import { RouterLink } from 'vue-router';

interface NavigationItem {
  name: string;
  icon: Component;
  href: string;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

defineProps<{
  collapsed: boolean;
}>();

const sections: NavigationSection[] = [
  {
    title: 'Workspace',
    items: [
      { name: 'Dashboard', icon: IconLayoutDashboard, href: '/' },
      { name: 'Markets', icon: IconChartLine, href: '/markets' },
      { name: 'Portfolio', icon: IconWallet, href: '/portfolio' },
      { name: 'Trade', icon: IconTwoWayArrowsLine, href: '/trades' },
    ],
  },
  {
    title: 'Analysis',
    items: [
      {
        name: 'Indicators',
        icon: IconChartBar,
        href: '/indicators',
      },
      {
        name: 'Alerts',
        icon: IconBellOutline,
        href: '/alerts',
      },
      {
        name: 'News',
        icon: IconNews,
        href: '/news',
      },
    ],
  },
];
</script>

<template>
  <div class="nav">
    <ul class="nav-section">
      <li v-for="section in sections" :key="section.title" class="nav-section">
        <span
          class="nav-title"
          :class="{ 'nav-title-hidden': collapsed }"
          :aria-hidden="collapsed"
          >{{ section.title }}</span
        >
        <ul class="nav-list">
          <li v-for="item in section.items" :key="item.href" class="nav-item">
            <RouterLink
              :to="item.href"
              class="nav-link"
              active-class="nav-link-active"
              :class="{ 'nav-link-collapsed': collapsed }"
            >
              <component :is="item.icon" class="nav-icon" />
              <span
                class="nav-label"
                :class="{ 'nav-label-hidden': collapsed }"
                :aria-hidden="collapsed"
                >{{ item.name }}</span
              ></RouterLink
            >
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul,
li {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-title {
  display: block;
  text-transform: uppercase;
  font-size: 0.65rem;
  color: var(--text-tertiary);
  padding: 0 0 0 10px;
  letter-spacing: 0.1em;
  overflow: hidden;
  white-space: nowrap;
  max-width: 160px;
  opacity: 1;
  transition:
    max-width var(--transition-base),
    opacity var(--transition-base);
}

.nav-title-hidden {
  max-width: 0;
  opacity: 0;
  padding-left: 0;
}

.nav-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-list:last-child {
  margin-bottom: 0.51rem;
}

.nav-link {
  display: flex;
  align-items: start;
  gap: 0.5rem;
  padding: 0.4rem 0.5rem;
  border-radius: 0.5rem;
  transition: gap var(--transition-base);
}

.nav-link-collapsed {
  justify-content: center;
  gap: 0;
}

.nav-link:not(.nav-link-active):hover {
  color: var(--text-primary);
  background-color: var(--bg-tertiary);
}

.nav-link-active {
  border-left: 2.5px solid var(--color-accent-500);
  background-color: color-mix(in srgb, var(--color-accent-600) 20%, transparent);
  color: var(--text-primary);
}

.nav-link-active > .nav-icon {
  color: var(--color-accent-500);
}

.nav-label {
  overflow: hidden;
  white-space: nowrap;
  max-width: 160px;
  opacity: 1;
  transition:
    max-width var(--transition-base),
    opacity var(--transition-base);
}

.nav-label-hidden {
  max-width: 0;
  opacity: 0;
}
</style>
