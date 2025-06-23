<template>
  <div class="pagination-wrapper">
    <n-space align="center">
      <n-button
        size="small"
        :disabled="currentPage <= 1"
        @click="$emit('update:page', currentPage - 1)"
      >
        ← Sebelumnya
      </n-button>

      <span class="text-sm text-gray-600">
        Halaman <strong>{{ currentPage }}</strong> dari {{ totalPages }}
      </span>

      <n-button
        size="small"
        :disabled="currentPage >= totalPages"
        @click="$emit('update:page', currentPage + 1)"
      >
        Selanjutnya →
      </n-button>
    </n-space>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits<{
  (e: "update:page", page: number): void;
}>();
</script>

<style scoped>
.pagination-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}
</style>
