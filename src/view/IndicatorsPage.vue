<script setup lang="ts">
import TopBar from '@/components/Topbar/TopBar.vue';
</script>

<template>
  <TopBar>
    <template #left>
      <h1>Left</h1>
    </template>
    <template #right>
      <h1>Right</h1>
    </template>
  </TopBar>
  <h1>Indicators</h1>
</template>
