# Windows License Store

Proyek website toko lisensi Windows dengan fitur pemesanan online via WhatsApp.

## � Ada Error di Vercel?

Lihat panduan troubleshooting: [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## �🚀 Deploy ke Vercel (Gratis)

### Langkah 1: Persiapan
1. Buat akun di [Vercel](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

### Langkah 2: Deploy
1. Login ke Vercel:
   ```bash
   vercel login
   ```

2. Deploy project:
   ```bash
   vercel --prod
   ```

3. Ikuti instruksi di terminal untuk setup domain.

### Langkah 3: Akses Website
Setelah deploy selesai, Anda akan mendapat URL seperti:
- `https://windows-license-store.vercel.app`

### Halaman yang Tersedia:
- **Toko Utama**: `https://your-domain.vercel.app/index.html`
- **Admin Tambah Produk**: `https://your-domain.vercel.app/admin.html`
- **Admin Hapus Produk**: `https://your-domain.vercel.app/delete.html`

## 📋 Fitur

- ✅ Daftar produk lisensi Windows
- ✅ Keranjang belanja
- ✅ Checkout via WhatsApp
- ✅ Admin panel untuk tambah/hapus produk
- ✅ Responsive design
- ✅ Data tersimpan di localStorage

## 🔧 Development

### Jalankan Lokal
```bash
npm install
npm start
```

Buka `http://localhost:3000` di browser.

### Struktur File
- `index.html` - Halaman toko utama
- `admin.html` - Halaman tambah produk
- `delete.html` - Halaman hapus produk
- `styles.css` - Styling
- `app.js` - Logika frontend
- `api.js` - API calls
- `admin.js` - Logika admin tambah
- `delete.js` - Logika admin hapus
- `server.js` - Backend API (Express.js)

## 📞 Kontak
WA: 081270517527
