<template>
  <n-modal
    v-model:show="visible"
    preset="dialog"
    title="Detail Produk"
    @close="$emit('close')"
  >
    <template #default>
      <div v-if="detail" class="space-y-2">
        <n-image
          :src="detail.image"
          alt="Gambar Produk"
          class="rounded"
          width="100%"
          style="max-height: 200px; object-fit: cover"
        />
        <p><strong>Nama:</strong> {{ detail.name }}</p>
        <p><strong>Deskripsi:</strong> {{ detail.description }}</p>
        <p><strong>SKU:</strong> {{ detail.sku }}</p>
        <p><strong>Harga:</strong> Rp {{ detail.price.toLocaleString() }}</p>
        <p><strong>Berat:</strong> {{ detail.weight }} gram</p>
        <p>
          <strong>Dimensi (P x L x T):</strong> {{ detail.length }} x
          {{ detail.width }} x {{ detail.height }} cm
        </p>
        <p><strong>Kategori:</strong> {{ detail.categoryName }}</p>
      </div>
      <div v-else class="text-center">
        <n-spin size="large" />
        <p class="mt-2">Memuat detail produk...</p>
      </div>
    </template>
    <template #action>
      <n-button @click="$emit('close')">Tutup</n-button>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import axios from "@/utils/api";

const props = defineProps<{
  show: boolean;
  product: any;
}>();
const emit = defineEmits(["close"]);

const visible = ref(false);
const detail = ref<any | null>(null);
const loading = ref(false);

// ⬅️ Pindahkan ke atas!
const fetchDetail = async (id: number) => {
  loading.value = true;
  try {
    const res = await axios.get(`/products/${id}`);
    detail.value = res.data.data;
  } catch (err) {
    console.error("Gagal ambil detail produk", err);
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  visible.value = props.show;

  if (visible.value && props.product?.id) {
    fetchDetail(props.product.id);
  }
});
</script>
