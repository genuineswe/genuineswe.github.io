# Andrel Karunia Sitanggang - Portfolio Website

Personal website and portfolio of Andrel Karunia Sitanggang, built with Gatsby and React.

## 🚀 Setup GitHub Pages

### Setelah Repository Privat

Jika website Anda 404 setelah membuat repository privat, ikuti langkah-langkah berikut:

#### 1. Enable GitHub Pages

1. Pergi ke repository GitHub Anda
2. Klik **Settings** → **Pages**
3. Di "Build and deployment", pilih **GitHub Actions**

#### 2. Workflow Configuration

Repository ini sudah dilengkapi dengan GitHub Actions workflow di `.github/workflows/deploy.yml` yang akan:
- Build otomatis saat push ke branch `main`
- Deploy ke GitHub Pages
- Support repository privat

#### 3. Required Settings

Pastikan repository settings memiliki:
- **Actions permissions**: Enabled
- **Workflow permissions**: Read and write permissions
- **Pages permissions**: Enabled

#### 4. Custom Domain (Opsional)

Jika menggunakan custom domain `gaweki.dev`:
1. Di **Settings** → **Pages** → **Custom domain**
2. Masukkan `gaweki.dev`
3. Update DNS records:
   ```
   A record: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   CNAME: www.gaweki.dev → genuineswe.github.io
   ```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run develop

# Build for production
npm run build

# Serve production build
npm run serve

# Clean cache
npm run clean
```

## 🚀 Manual Deployment ke GitHub Pages

Jika Anda ingin melakukan deployment manual ke branch `gh-pages`, ikuti langkah-langkah berikut:

### Langkah 1: Build Project Gatsby
```bash
npm run build
```
Perintah ini akan menghasilkan folder `public` yang berisi file-file statis website.

### Langkah 2: Cek Status Git
```bash
git status
```
Pastikan Anda berada di branch utama (biasanya `master` atau `main`).

### Langkah 3: Buat Branch gh-pages Baru
```bash
git checkout --orphan gh-pages
```
Perintah ini membuat branch baru `gh-pages` tanpa riwayat commit sebelumnya.

### Langkah 4: Hapus Semua File yang Ada
```bash
git rm -rf .
```
Ini akan menghapus semua file dari working directory tapi tetap mempertahankan folder `public`.

### Langkah 5: Salin Isi Folder public ke Root
```bash
cp -r public/* .
```
Menyalin semua isi folder `public` ke direktori root.

### Langkah 6: Tambahkan File ke Git
```bash
git add .
```

### Langkah 7: Commit File-file
```bash
git commit -m "Deploy to GitHub Pages"
```

### Langkah 8: Push ke Remote Repository
```bash
git push origin gh-pages --force
```
Gunakan `--force` karena ini akan menimpa branch `gh-pages` yang sudah ada.

### Langkah 9: Kembali ke Branch Utama (Opsional)
```bash
git checkout master
# atau
git checkout main

git branch -D gh-pages

```

### Catatan Penting:
- Pastikan Anda sudah melakukan build terlebih dahulu sebelum memulai proses deploy
- Gunakan `--force` hanya jika Anda yakin ingin menimpa branch `gh-pages` yang ada
- Setelah deploy, website akan tersedia di GitHub Pages URL Anda
- Untuk deploy selanjutnya, ulangi langkah 1, 3-8

### Quick Deploy Script (Opsional)
Anda bisa membuat script `deploy.sh` untuk mempermudah:
```bash
#!/bin/bash
echo "Building project..."
npm run build

echo "Deploying to gh-pages..."
git checkout --orphan gh-pages
git rm -rf .
cp -r public/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages --force

echo "Returning to main branch..."
git checkout main

echo "Deployment complete!"
```
or
```
npm run build&&
git checkout --orphan gh-pages&&
git rm -rf .&&
cp -r public/* .&&
git add .&&
git commit -m "Deploy to GitHub Pages"&&
git push origin gh-pages --force&&
git checkout master&&
git branch -D gh-pages&&
npm i
```

## � Project Structure

```
src/
├── components/     # Reusable React components
├── pages/         # Page components
├── styles/        # CSS and styling
└── utils/         # Utility functions
```

## 🎨 Technologies Used

- **Gatsby** - Static Site Generator
- **React** - UI Library
- **Tailwind CSS** - CSS Framework
- **PostCSS** - CSS Processing

## 📝 Troubleshooting

### Website 404 Setelah Repository Privat

1. **Check GitHub Actions**: Pastikan workflow berjalan di tab "Actions"
2. **Verify Permissions**: Pastikan repository memiliki permissions yang benar
3. **Check Build Logs**: Lihat log build untuk error details
4. **Wait for Deployment**: Deployment bisa memakan waktu 5-10 menit

### Force Re-deploy

```bash
# Push dengan commit baru untuk trigger deployment
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

## 📄 License

MIT License - see LICENSE file for details