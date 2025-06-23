<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="image-section" v-if="!isMobile">
        <img src="/login.jpeg" alt="Login Illustration" />
      </div>
      <div class="form-section">
        <n-card :bordered="false" class="form-card">
          <div class="text-center mb-4">
            <h2 class="text-2xl font-bold">
              Selamat Datang di Toko Klontong 🐻
            </h2>
            <p class="text-gray-500">
              Ready to provide excellent service to our customers?
            </p>
          </div>
          <n-form @submit.prevent="handleLogin">
            <n-input
              v-model:value="email"
              type="text"
              placeholder="Email"
              class="mb-3"
            />
            <n-input
              v-model:value="password"
              type="password"
              show-password-on="click"
              placeholder="Password"
              class="mb-3"
            />

            <n-button
              type="primary"
              block
              @click="handleLogin"
              :loading="loading"
              class="!bg-amber-700 hover:!bg-amber-600"
            >
              Sign In
            </n-button>
            <n-alert type="error" class="mt-4" v-if="error">{{
              error
            }}</n-alert>
          </n-form>
          <div class="text-center mt-4">
            <span>Belum punya akun?</span>
            <n-button text @click="$router.push('/register')"
              >Daftar di sini</n-button
            >
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
const message = useMessage();

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);
const isMobile = ref(false);

const auth = useAuthStore();

const handleLogin = async () => {
  error.value = "";
  loading.value = true;
  try {
    await auth.login(email.value, password.value);
    message.success("Login berhasil, selamat datang!");
    router.push("/");
  } catch (err: any) {
    error.value = err.response?.data?.message || "Login gagal";
    message.error(error.value);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  isMobile.value = window.innerWidth < 768;
});
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #ffcc70, #ffb347);
  padding: 1rem;
}

.login-container {
  display: flex;
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  flex-direction: row;
}

.image-section {
  flex: 1;
  background-color: #ffe0b3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.image-section img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.form-section {
  flex: 1;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-card {
  width: 100%;
  max-width: 360px;
  background-color: white;
  box-shadow: none;
}
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    border-radius: 0;
    box-shadow: none;
  }

  .image-section {
    display: none;
  }

  .form-section {
    padding: 1.5rem;
  }

  .form-card {
    max-width: 100%;
  }
}
</style>
