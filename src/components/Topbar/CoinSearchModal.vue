<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore';
import type { SearchCoinResult } from '@/typings';
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { useTemplateRef } from 'vue';

const open = defineModel<boolean>('open', { default: false });
const query = defineModel<string>('query', { default: '' });

const props = defineProps<{ ignoreTarget: HTMLElement | null }>();

const coinStore = useCoinStore();
const { searchResult, isSearching } = storeToRefs(coinStore);

const modalRef = useTemplateRef<HTMLDivElement>('modalRef');

onClickOutside(
  modalRef,
  () => {
    open.value = false;
  },
  { ignore: () => [props.ignoreTarget] },
);

onKeyStroke('Escape', () => {
  open.value = false;
});

const handleSelect = async (result: SearchCoinResult) => {
  await coinStore.fetchCoin(result.id);
  if (coinStore.selectedCoin) {
    coinStore.selectCoin(coinStore.selectedCoin);
  }
  query.value = '';
  open.value = false;
};
</script>

<template>
  <div class="backdrop" v-if="open">
    <div ref="modalRef" class="coin-search-modal">
      <div class="modal-header">
        <div class="start">
          <i-tabler:search class="search-icon" />
          <input type="text" v-model="query" placeholder="Symbol, Name" class="search-input" />
        </div>
        <div class="end">
          <button class="clear-button" @click="query = ''">Clear</button>
          <button class="close-button" @click="open = false"><i-tabler:x /></button>
        </div>
      </div>
      <div class="modal-body">
        <h2>Modal Body</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  padding-top: 100px;

  background-color: rgba(0, 0, 0, 0.4);
}

.coin-search-modal {
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  margin: auto;
  padding: 1.5rem;
  width: 60%;

  background: var(--bg-secondary);
}

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.start {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.5rem 1rem;

  border: none;
  border-radius: var(--radius-sm);
  background-color: var(--bg-tertiary);
}

.end {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.clear-button {
  padding: 0.5rem 1rem;

  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);

  color: var(--color-accent-400);
  border: 1px solid var(--color-accent-600);
  border-radius: var(--radius-md);

  background: none;
}

.clear-button:hover {
  color: var(--text-primary);
  border: 1px solid var(--color-accent-300);
  border-radius: var(--radius-md);
  background-color: color-mix(in srgb, var(--color-accent-600) 30%, transparent);

  cursor: pointer;
}

.close-button {
  font-size: var(--font-size-lg);

  color: var(--color-accent-600);
  border: none;
  background: none;

  cursor: pointer;
}
</style>
