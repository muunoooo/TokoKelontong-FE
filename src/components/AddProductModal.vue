<template>
  <n-modal
    :show="show"
    @update:show="emit('close')"
    title="Tambah Produk Baru"
    preset="dialog"
  >
    <div class="modal-body-scrollable">
      <n-form :model="form" :rules="rules" ref="formRef">
        <n-form-item label="Nama Produk" path="name">
          <n-input
            v-model:value="form.name"
            placeholder="Contoh: Kopi Sachet"
          />
        </n-form-item>

        <n-form-item label="SKU" path="sku">
          <n-input v-model:value="form.sku" placeholder="Contoh: SKU123" />
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
          <n-button @click="handleCancel">Batal</n-button>
          <n-button type="primary" @click="handleSubmit">Simpan</n-button>
        </n-space>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import axios from "@/utils/api";
import { useMessage } from "naive-ui";
const message = useMessage();

const props = defineProps<{
  show: boolean;
}>();
const emit = defineEmits(["close", "saved"]);

const formRef = ref();

const form = reactive({
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

const rules = {
  name: { required: true, message: "Nama wajib diisi", trigger: "blur" },
  sku: { required: true, message: "SKU wajib diisi", trigger: "blur" },
};

watch(
  () => props.show,
  (val) => {
    if (val) {
      resetForm();
    }
  }
);

const resetForm = () => {
  Object.assign(form, {
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
};

const handleCancel = () => {
  emit("close");
};

const handleSubmit = async () => {
  try {
    await formRef.value?.validate();
    const response = await axios.post("/products", form);

    message.success("Produk berhasil ditambahkan");

    emit("saved", response.data);
    emit("close");
  } catch (error) {
    console.error("Gagal menambahkan produk:", error);

    message.error("Gagal menambahkan produk. Coba lagi nanti.");
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
