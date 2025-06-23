<template>
  <n-input
    v-model:value="searchInput"
    placeholder="Cari produk..."
    clearable
    @input="debouncedSearch"
    :loading="loading"
  >
    <template #prefix> 🔍 </template>
  </n-input>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  loading?: boolean;
}>();
const emit = defineEmits(["search"]);

const searchInput = ref("");

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const debouncedSearch = () => {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    emit("search", searchInput.value);
  }, 500);
};
</script>
