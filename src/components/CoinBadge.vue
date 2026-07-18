<script setup lang="ts">
import { useCoinSearch } from '@/composable/useCoinSearch';
import { useCoinStore } from '@/stores/coinStore';
import { storeToRefs } from 'pinia';
import { ref, useTemplateRef } from 'vue';
import CoinSearchModal from './Topbar/CoinSearchModal.vue';

const coinStore = useCoinStore();

const { selectedCoin, coinList, isLoading, error } = storeToRefs(coinStore);
const { query, searchResult, isSearching } = useCoinSearch();

const isModalOpen = ref(false);

const badgeRef = useTemplateRef<HTMLButtonElement>('badgeRef');

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
  console.log(isModalOpen.value);
};
</script>

<template>
  <button class="coin-badge" @click="toggleModal" ref="badgeRef">
    <img :src="selectedCoin?.image" alt="Coin Logo" class="coin-logo" />
    <span class="coin-name">{{ selectedCoin?.symbol }} / {{ selectedCoin?.name }}</span>
    <i-tabler:chevron-down class="coin-badge-icon" />
  </button>

  <CoinSearchModal v-model:open="isModalOpen" v-model:query="query" :ignore-target="badgeRef" />
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
  border: none;
}

.coin-logo {
  width: 3rem;
  height: 3rem;
}

.coin-name {
  color: #ffffff;
}

.coin-badge-icon {
  color: var(--text-tertiary);
}
</style>
