<script lang="ts" setup>
defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{ toggle: [] }>();
</script>

<template>
  <div class="nav-logo" :class="{ 'nav-logo-collapsed': collapsed }">
    <a
      href="/"
      class="nav-logo-link"
      :class="{ 'nav-logo-link-hidden': collapsed }"
      :aria-hidden="collapsed"
    >
      <img src="/crypto-dashboard-logo-text.svg" alt="Company Logo" />
    </a>
    <button aria-label="Toggle Sidebar" class="sidebar-toggle" @click="emit('toggle')">
      <i-tabler:layout-sidebar class="sidebar-icon" />
    </button>
  </div>
</template>

<style scoped>
.nav-logo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  transition: gap var(--transition-base);
}

.nav-logo-collapsed {
  justify-content: center;
  gap: 0;
}

.nav-logo img {
  width: 125%;
  height: auto;
}

.nav-logo-link {
  overflow: hidden;
  max-width: 200px;
  opacity: 1;
  transition:
    max-width var(--transition-base),
    opacity var(--transition-base);
}

.nav-logo-link-hidden {
  max-width: 0;
  opacity: 0;
}

.sidebar-icon {
  color: var(--text-primary);
  flex-shrink: 0;
}

.sidebar-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
}
</style>
