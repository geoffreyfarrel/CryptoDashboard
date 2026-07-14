<script setup lang="ts">
import NavigationList from './NavigationList.vue';
import NavLogo from './NavLogo.vue';

defineProps<{ collapsed: boolean }>();

const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-collapsed': collapsed }">
    <NavLogo :collapsed="collapsed" @toggle="emit('toggle')" />
    <NavigationList :collapsed="collapsed" />
  </nav>
</template>

<style scoped>
.navbar {
  height: 100dvh;
  width: var(--sidebar-width);

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
  width: var(--sidebar-width-collapsed);
  padding: 0.75rem 0.75rem;
}
</style>
