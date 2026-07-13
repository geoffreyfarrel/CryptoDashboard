<script setup lang="ts">
import { ref } from 'vue';
import NavigationList from './NavigationList.vue';
import NavLogo from './NavLogo.vue';

const collapsed = ref(false);

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-collapsed': collapsed }">
    <NavLogo :collapsed="collapsed" @toggle="toggleCollapsed" />
    <NavigationList :collapsed="collapsed" />
  </nav>
</template>

<style scoped>
.navbar {
  height: 100dvh;
  width: 250px;

  position: fixed;
  top: 0;
  left: 0;

  background-color: var(--bg-secondary);
  color: #fff;
  overflow-y: auto;

  border: 1px solid var(--border-color);

  padding: 0.75rem 1.5rem;

  transition: width var(--transition-base);
  overflow-x: hidden;
}

.navbar-collapsed {
  width: 76px;
  padding: 0.75rem 0.75rem;
}
</style>
