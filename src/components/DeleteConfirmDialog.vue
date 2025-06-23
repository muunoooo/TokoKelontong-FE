<template>
  <n-modal
    :show="visible"
    preset="dialog"
    title="Hapus Produk"
    @update:show="handleVisibleUpdate"
    @close="handleCancel"
  >
    <template #default>
      <p>
        Apakah kamu yakin ingin menghapus <strong>{{ product.name }}</strong
        >?
      </p>
    </template>
    <template #action>
      <n-button type="error" @click="handleConfirm">Ya, Hapus</n-button>
      <n-button @click="handleCancel">Batal</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  product: any;
  show: boolean;
}>();

const emit = defineEmits(["confirm", "cancel"]);

const visible = ref(false);

watch(
  () => props.show,
  (val) => {
    visible.value = val;
  },
  { immediate: true }
);

const handleVisibleUpdate = (val: boolean) => {
  visible.value = val;
  if (!val) emit("cancel");
};

const handleConfirm = () => {
  emit("confirm");
};

const handleCancel = () => {
  visible.value = false;
  emit("cancel");
};
</script>
