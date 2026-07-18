<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore';
import { storeToRefs } from 'pinia';

const coinStore = useCoinStore();

const { selectedCoin, coinList, isLoading, error } = storeToRefs(coinStore);
</script>

<template>
  <button class="coin-badge">
    <img :src="selectedCoin?.image" alt="Coin Logo" class="coin-logo" />
    <span class="coin-name">{{ selectedCoin?.symbol }} / {{ selectedCoin?.name }}</span>
  </button>
</template>

<style scoped>
.coin-badge {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 0.5rem 1rem;

  background: none;
}

.coin-logo {
  width: 3rem;
  height: 3rem;
}

.coin-name {
  color: #ffffff;
}
</style>
