<template>
  <div class="dashboard-container">
    <n-layout>
      <n-layout-header bordered class="flex justify-between items-center">
        <h1 class="text-xl font-bold">Toko Klontong</h1>
        <n-button @click="logout" type="error">Logout</n-button>
      </n-layout-header>

      <n-layout-content class="p-6">
        <n-card title="Selamat datang kembali!" class="mb-4">
          <p>Halo, {{ user?.name || "Kasir" }}!</p>
          <p>
            Semoga harimu menyenangkan. Kamu bisa mulai mengelola produk,
            pesanan, dan laporan dari sini.
          </p>
        </n-card>

        <n-card title="Daftar Produk" class="mb-4">
          <n-button type="primary" class="mb-4" @click="showAddModal = true">
            Tambah Produk
          </n-button>
          <div v-if="loading">Loading produk...</div>

          <!-- LIST MODE -->
          <div class="product-list-mode">
            <n-card
              v-for="product in products"
              :key="product.id"
              class="!p-4"
              :title="product.name"
              hoverable
            >
              <div class="product-row">
                <div class="product-info">
                  <p class="product-meta">
                    {{ product.categoryName }} -
                    {{
                      product.price.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                    }}
                  </p>
                </div>
                <div class="product-actions">
                  <n-button
                    type="primary"
                    size="small"
                    @click="handleEdit(product)"
                    >Edit</n-button
                  >
                  <n-button
                    type="error"
                    size="small"
                    @click="handleDelete(product)"
                    >Hapus</n-button
                  >
                  <n-button size="small" @click="handleDetail(product)"
                    >Lihat Detail</n-button
                  >
                </div>
              </div>
            </n-card>
          </div>

          <!-- CARD MODE -->
          <div class="product-card-mode">
            <n-card
              v-for="product in products"
              :key="product.id"
              hoverable
              class="product-card"
            >
              <img
                :src="product.image"
                alt="product image"
                class="card-image"
              />
              <div class="card-body">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-meta">{{ product.categoryName }}</p>
                <p class="product-price">
                  {{
                    product.price.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                  }}
                </p>
                <div class="product-actions">
                  <n-button
                    type="primary"
                    size="tiny"
                    @click="handleEdit(product)"
                    >Edit</n-button
                  >
                  <n-button
                    type="error"
                    size="tiny"
                    @click="handleDelete(product)"
                    >Hapus</n-button
                  >
                  <n-button size="tiny" @click="handleDetail(product)"
                    >Lihat</n-button
                  >
                </div>
              </div>
            </n-card>
          </div>
        </n-card>

        <EditProductModal
          v-if="showEditModal"
          :show="showEditModal"
          :product="selectedProduct"
          @close="confirmEdit"
        />

        <DeleteConfirmDialog
          v-if="showDeleteModal"
          :key="selectedProduct?.id"
          :show="showDeleteModal"
          :product="selectedProduct"
          @confirm="confirmDelete"
          @cancel="
            () => {
              showDeleteModal = false;
              selectedProduct = null;
            }
          "
        />

        <ProductDetailModal
          v-if="showDetailModal"
          :show="showDetailModal"
          :product="selectedProduct"
          @close="closeDetail"
        />
        <AddProductModal
          v-if="showAddModal"
          :show="showAddModal"
          @close="showAddModal = false"
          @saved="fetchProducts"
        />
      </n-layout-content>
    </n-layout>
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @update:page="
        (page) => {
          currentPage = page;
          fetchProducts();
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { NLayout, NLayoutHeader, NLayoutContent } from "naive-ui";

import { computed, onMounted, ref } from "vue";
import axios from "@/utils/api";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import EditProductModal from "@/components/ProductEditModal.vue";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog.vue";
import ProductDetailModal from "@/components/ProductDetailModal.vue";
import AddProductModal from "@/components/AddProductModal.vue";
import { useMessage } from "naive-ui";
const message = useMessage();

const auth = useAuthStore();
const router = useRouter();
const user = computed(() => auth.user);

const products = ref<any[]>([]);
const loading = ref(true);
const currentPage = ref(1);
const totalPages = ref(1);
const selectedProduct = ref<any>(null);

const showEditModal = ref(false);
const showDeleteModal = ref(false);
const showDetailModal = ref(false);
const showAddModal = ref(false);

const fetchProducts = async () => {
  try {
    loading.value = true;
    const res = await axios.get("/products", {
      params: { page: currentPage.value },
    });
    products.value = res.data.data;
    totalPages.value = res.data.meta.totalPages;
  } catch (err) {
    console.error("Gagal fetch produk", err);
  } finally {
    loading.value = false;
  }
};

const handleEdit = (product: any) => {
  selectedProduct.value = product;
  showEditModal.value = true;
};

const handleDelete = (product: any) => {
  selectedProduct.value = product;
  showDeleteModal.value = true;
};

const handleDetail = (product: any) => {
  selectedProduct.value = product;
  showDetailModal.value = true;
};

const logout = () => {
  auth.logout();
  message.success("Logout berhasil. Sampai jumpa 👋");

  setTimeout(() => {
    router.push("/login");
  }, 800);
};

onMounted(async () => {
  await auth.fetchMe();
  await fetchProducts();
});

const confirmDelete = async () => {
  if (!selectedProduct.value?.id) return;
  try {
    await axios.delete(`/products/${selectedProduct.value.id}`);
    showDeleteModal.value = false;
    selectedProduct.value = null;
    await fetchProducts();

    message.success("Produk berhasil dihapus");
  } catch (err) {
    console.error("Gagal hapus produk:", err);
    message.error("Gagal menghapus produk");
  }
};

const confirmEdit = async () => {
  showEditModal.value = false;
  selectedProduct.value = null;
  await fetchProducts();
};

const closeDetail = () => {
  showDetailModal.value = false;
  selectedProduct.value = null;
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(to right, #fceabb, #f8b500);
  padding-bottom: 2rem;
  box-sizing: border-box;
}

.n-layout-header {
  background-color: #fff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #ddd;
}

.n-layout-content {
  padding: 1.5rem 2rem;
}

.product-list-mode,
.product-card-mode {
  display: none;
  gap: 1rem;
}

@media (min-width: 768px) {
  .product-list-mode {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media (max-width: 767px) {
  .product-card-mode {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1rem;
  }
}

.n-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.n-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-info {
  flex: 1;
}

.product-meta {
  font-size: 0.9rem;
  color: #555;
}

.product-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.product-card {
  overflow: hidden;
  padding: 0;
}

.card-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.card-body {
  padding: 0.75rem;
}

.product-name {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
}

.product-price {
  font-weight: bold;
  margin: 0.5rem 0;
  color: #d35400;
}
</style>
