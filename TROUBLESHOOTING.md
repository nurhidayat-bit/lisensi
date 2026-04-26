# Troubleshooting Vercel Deployment

## Error Umum dan Solusinya

### 1. API Tidak Bisa Diakses (404/500 Error)

**Gejala:**
- Produk tidak muncul di halaman
- Console browser menampilkan error fetch API
- Admin panel tidak bisa menambah/hapus produk

**Solusi:**
1. **Redeploy aplikasi:**
   ```bash
   vercel --prod
   ```

2. **Cek Vercel logs:**
   - Buka dashboard Vercel
   - Pilih project → Functions → Lihat logs
   - Cari error messages

3. **Cek CORS issues:**
   - Pastikan `vercel.json` memiliki headers CORS
   - Cek console browser untuk CORS errors

### 2. Halaman Tidak Loading

**Gejala:**
- 404 error di semua halaman
- Blank page

**Solusi:**
1. **Cek file structure:**
   - Pastikan semua file HTML, JS, CSS ada
   - Cek `vercel.json` routing

2. **Redeploy:**
   ```bash
   vercel --prod --force
   ```

### 3. Produk Tidak Muncul

**Gejala:**
- Halaman kosong atau hanya produk default

**Solusi:**
1. **Cek API endpoint:**
   - Kunjungi: `https://your-domain.vercel.app/api/products`
   - Harus return JSON array

2. **Cek console browser:**
   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error messages

### 4. WhatsApp Checkout Tidak Bekerja

**Gejala:**
- Tombol checkout tidak redirect ke WhatsApp

**Solusi:**
1. **Cek nomor WhatsApp:**
   - Pastikan format: `6281270517527` (tanpa +)
   - Test link manual: `https://api.whatsapp.com/send?phone=6281270517527&text=test`

2. **Cek JavaScript errors:**
   - Console browser untuk error di `app.js`

## Debug Steps

### Step 1: Cek API
```bash
curl https://your-domain.vercel.app/api/products
```

Harus return:
```json
[
  {
    "id": 1,
    "name": "Windows 11 Home...",
    "price": 1390000,
    "sku": "WIN11HOME"
  }
]
```

### Step 2: Cek Console Browser
1. Buka halaman toko
2. Tekan F12 → Tab Console
3. Reload halaman
4. Lihat error messages

### Step 3: Test Admin Panel
1. Buka `admin.html`
2. Coba tambah produk
3. Cek apakah muncul di halaman utama

## Jika Masih Error

1. **Hapus deployment lama:**
   ```bash
   vercel remove
   ```

2. **Deploy ulang:**
   ```bash
   vercel --prod
   ```

3. **Cek versi Node.js:**
   - Pastikan `package.json` punya `"engines": {"node": "18.x"}`

## Kontak Support

Jika masih ada masalah, berikan:
- URL Vercel Anda
- Screenshot error console
- Logs dari Vercel dashboard