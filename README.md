<div align="center">

# Cek Resi All

**Pelacak resi pengiriman** untuk banyak ekspedisi Indonesia dalam satu antarmuka — cukup masukkan nomor resi.

[![Status](https://img.shields.io/badge/status-complete-brightgreen?style=flat-square)](#)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Tentang

Cek status paket tanpa harus membuka situs masing-masing ekspedisi. Masukkan nomor resi, pilih kurir, dan seluruh riwayat perjalanan paket ditampilkan dalam satu timeline.

Data pelacakan diambil dari **[Binderbyte API](https://binderbyte.com)** yang mendukung puluhan ekspedisi Indonesia (JNE, J&T, SiCepat, POS, AnterAja, Ninja, dan lainnya).

## Fitur

- Satu form untuk semua kurir yang didukung Binderbyte; nomor resi dikirim bersama nama kurir.
- Hasil ditampilkan sebagai timeline: riwayat status berurutan dari pengiriman sampai diterima.
- Ringkasan paket di atas timeline: nomor resi, kurir, status terkini, dan estimasi.
- Halaman di-*code split* dengan `React.lazy` + `Suspense`, jadi bundle awal tetap kecil.
- Route yang tidak dikenal jatuh ke halaman 404.

## Tech Stack

| Bagian | Teknologi |
| --- | --- |
| Framework | React 18 + Vite |
| Routing | React Router 6 |
| Styling | Tailwind CSS |
| Data | [Binderbyte API](https://api.binderbyte.com/v1/track) |
| Deploy | Netlify (`_redirects` untuk SPA) |

## Menjalankan

### 1. Clone & install

```bash
git clone https://github.com/Ilhamaji/cek-resi-all.git
cd cek-resi-all
npm install
```

### 2. API key

Daftar di [binderbyte.com](https://binderbyte.com) untuk mendapatkan API key, lalu buat `.env`:

```env
VITE_API_KEY=your_binderbyte_key
```

### 3. Jalankan

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

## Struktur

```
src/
  App.jsx                 # routing + layout + dekorasi latar
  components/Nav.jsx      # navigasi
  pages/
    Home.jsx              # form input resi & hasil pelacakan
    About.jsx             # info aplikasi
    Notfound.jsx          # halaman 404
public/_redirects         # aturan rewrite SPA untuk Netlify
.github/workflows/deploy.yaml
```

## Endpoint

```http
GET https://api.binderbyte.com/v1/track?api_key={KEY}&courier={kurir}&awb={nomor_resi}
```

> **Catatan:** API key dipanggil langsung dari browser (`VITE_` prefix), sehingga terekspos di bundle. Untuk penggunaan publik, pindahkan pemanggilan ke backend/proxy agar key tidak bisa disalahgunakan.

## Lisensi

MIT.

---

<div align="center">
Dibuat oleh <a href="https://github.com/Ilhamaji">Ilham Aji</a>
</div>
