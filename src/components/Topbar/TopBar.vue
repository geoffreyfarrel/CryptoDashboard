<script lang="ts"></script>

<template>
  <div class="topbar">
    <div class="left">
      <slot name="left" />
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
.topbar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  min-height: 4rem;
  padding: 1rem;

  border-bottom: 1px solid var(--border-color);
}
</style>
