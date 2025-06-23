<template>
  <div class="flex justify-between items-center mt-4">
    <n-button
      :disabled="currentPage <= 1"
      @click="$emit('update:page', currentPage - 1)"
    >
      ← Prev
    </n-button>

    <span class="text-sm font-medium">Halaman {{ currentPage }} dari {{ totalPages }}</span>

    <n-button
      :disabled="currentPage >= totalPages"
      @click="$emit('update:page', currentPage + 1)"
    >
      Next →
    </n-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>
