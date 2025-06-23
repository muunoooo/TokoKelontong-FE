# 🧾 Toko Klontong - Frontend

Ini adalah aplikasi frontend **Toko Klontong**, sistem manajemen produk berbasis web untuk usaha kecil menengah (UMKM). Dibuat menggunakan **Vue 3**, **Naive UI**, dan **TypeScript**.

---

## 🚀 Fitur Utama

- Login & Register user
- Tambah, edit, dan hapus produk
- Manajemen kategori dan harga
- UI responsif dan mudah digunakan
- Notifikasi via toast (Naive UI)

---

## 📦 Tech Stack

- Vue 3 + Vite
- TypeScript
- Naive UI
- Pinia (jika digunakan)
- Axios

---

## 🛠️ Cara Install & Setup

1. **Clone repository ini**

```bash
git clone https://github.com/username/toko-klontong-frontend.git
cd toko-klontong-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Atur konfigurasi environment**

Buat file `.env` jika dibutuhkan, atau pastikan base URL backend sudah disetting di `axios` (misalnya `/src/utils/api.ts`):

```ts
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // Ganti dengan URL backend kamu
  ...
});
```

4. **Jalankan aplikasi**

```bash
npm run dev
```

Buka di browser:

```
http://localhost:5173
```

---

## 👤 Contoh Akun Login

| Email            | Password   |
|------------------|------------|
| admin@gmail.com  | admin123   |

> ⚠️ Ini hanya contoh. Kamu bisa mendaftarkan akun baru melalui halaman register.

---

## 📸 Tampilan Antarmuka

![Login Page](public/login.jpeg)
> Halaman login dengan ilustrasi dan toast notification

---

## 📄 Lisensi

Proyek ini dibuat oleh **M Naufal**. Gunakan dan kembangkan sesuai kebutuhan UMKM kamu.
