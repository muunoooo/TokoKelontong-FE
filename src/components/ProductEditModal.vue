<template>
  <n-modal
    :show="show"
    @update:show="emit('close')"
    title="Edit Produk"
    preset="dialog"
  >
    <div class="modal-body-scrollable">
      <n-form :model="form" ref="formRef">
        <n-form-item label="Nama Produk" path="name">
          <n-input v-model:value="form.name" placeholder="Nama Produk" />
        </n-form-item>

        <n-form-item label="SKU" path="sku">
          <n-input v-model:value="form.sku" placeholder="SKU" />
        </n-form-item>

        <n-form-item label="Deskripsi" path="description">
          <n-input type="textarea" v-model:value="form.description" />
        </n-form-item>

        <n-form-item label="Berat (gram)" path="weight">
          <n-input-number v-model:value="form.weight" :min="0" />
        </n-form-item>

        <n-form-item label="Dimensi (cm)">
          <div class="flex gap-2">
            <n-input-number v-model:value="form.length" placeholder="Panjang" />
            <n-input-number v-model:value="form.width" placeholder="Lebar" />
            <n-input-number v-model:value="form.height" placeholder="Tinggi" />
          </div>
        </n-form-item>

        <n-form-item label="Harga" path="price">
          <n-input-number
            v-model:value="form.price"
            :min="0"
            :format="formatRupiah"
            :parse="parseRupiah"
          />
        </n-form-item>

        <n-form-item label="URL Gambar" path="image">
          <n-input v-model:value="form.image" placeholder="https://..." />
        </n-form-item>

        <n-form-item label="Kategori" path="categoryName">
          <n-input v-model:value="form.categoryName" />
        </n-form-item>

        <n-form-item label="ID Kategori" path="CategoryId">
          <n-input-number v-model:value="form.CategoryId" :min="1" />
        </n-form-item>
      </n-form>
    </div>

    <template #action>
      <div class="modal-footer">
        <n-space justify="end">
          <n-button @click="emit('close')">Batal</n-button>
          <n-button type="primary" @click="handleSubmit" :loading="loading">
            Simpan
          </n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import axios from "@/utils/api";
import { useMessage } from "naive-ui";

const props = defineProps<{
  product: any;
  show: boolean;
}>();
const emit = defineEmits(["close"]);

const message = useMessage();
const formRef = ref();
const loading = ref(false);

const form = ref({
  name: "",
  sku: "",
  description: "",
  weight: 0,
  width: 0,
  length: 0,
  height: 0,
  price: 0,
  image: "",
  categoryName: "",
  CategoryId: 0,
});

watch(
  () => props.product,
  (val) => {
    if (val) {
      Object.assign(form.value, val);
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  try {
    loading.value = true;
    await axios.put(`/products/${props.product.id}`, form.value);
    message.success("Produk berhasil diperbarui");
    emit("close");
  } catch (err) {
    console.error("Gagal update:", err);
    message.error("Gagal memperbarui produk");
  } finally {
    loading.value = false;
  }
};
const formatRupiah = (value: number | null): string => {
  if (value === null) return "";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

const parseRupiah = (text: string): number => {
  return Number(text.replace(/[Rp.,\s]/g, ""));
};
</script>

<style scoped>
.modal-body-scrollable {
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 4px;
  margin-bottom: 1rem;
}

.modal-footer {
  position: sticky;
  bottom: 0;
  background-color: white;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-top: 1px solid #eee;
}

.flex {
  display: flex;
}
.gap-2 {
  gap: 0.5rem;
}
</style>
