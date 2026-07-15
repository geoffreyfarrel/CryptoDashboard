<script setup lang="ts">
import NavigationBar from '@/components/Navbar/NavigationBar.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const collapsed = ref(false);
const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <div class="layout">
    <NavigationBar :collapsed="collapsed" @toggle="toggleCollapsed" />
    <main class="main-content" :class="{ 'main-content-collapsed': collapsed }">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-content {
  margin-left: var(--sidebar-width);

  transition: margin-left var(--transition-base);
}

.main-content-collapsed {
  margin-left: var(--sidebar-width-collapsed);

  transition: margin-left var(--transition-base);
}
</style>
