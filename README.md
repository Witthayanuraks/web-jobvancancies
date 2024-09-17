

---

# Job Vacancies Website

Ini adalah proyek website **Job Vacancies** yang dibangun menggunakan **React.js** dengan **Vite.js** sebagai bundler. Aplikasi ini menampilkan daftar lowongan pekerjaan yang memungkinkan pengguna untuk mencari dan melihat detail lowongan.

## Fitur

- Melihat daftar lowongan pekerjaan
- Mencari lowongan berdasarkan kata kunci
- Menampilkan detail setiap lowongan pekerjaan
- Desain responsif untuk tampilan di desktop dan perangkat mobile
- Data dummy disimpan di MySQL dan diambil melalui API

## Teknologi yang Digunakan

- **React.js**: Library front-end untuk membangun antarmuka pengguna.
- **Vite.js**: Bundler yang ringan dan cepat untuk proyek React.
- **MySQL**: Digunakan untuk menyimpan dummy data lowongan pekerjaan.
- **Express.js**: Digunakan untuk membuat backend API yang menghubungkan frontend dengan MySQL.
- **Axios**: Untuk melakukan request API dari frontend ke backend.
- **Tailwind CSS**: Digunakan untuk mendesain tampilan yang responsif dan modern.

## Instalasi

1. **Clone repositori ini**:

   ```bash
   git clone https://github.com/username/job-vacancies-website.git
   ```

2. **Masuk ke direktori proyek**:

   ```bash
   cd job-vacancies-website
   ```

3. **Install dependencies** untuk frontend:

   ```bash
   npm install
   ```

4. **Install dependencies** untuk backend (opsional jika backend menggunakan Node.js/Express.js):

   ```bash
   cd backend
   npm install
   ```

## Konfigurasi Database MySQL

1. **Buat database** baru di MySQL dengan nama `job_vacancies_db`.
2. **Import** file dummy data SQL yang disediakan di dalam folder `/database` ke dalam database Anda.
3. **Sesuaikan** konfigurasi koneksi MySQL di file `config.js` (jika backend menggunakan Node.js/Express.js):

   ```js
   const dbConfig = {
     host: 'localhost',
     user: 'root',
     password: 'your_password',
     database: 'job_vacancies_db'
   };
   ```

## Menjalankan Proyek

### Frontend (React.js + Vite.js)

1. **Jalankan aplikasi React**:

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`.

### Backend (Express.js)

1. **Jalankan server backend**:

   ```bash
   npm run start
   ```

   Server backend akan berjalan di `http://localhost:3000`.

### MySQL Dummy Data

Dummy data lowongan pekerjaan akan disimpan di MySQL dan diambil melalui API yang diatur di backend. Pastikan server MySQL Anda berjalan dengan database yang telah di-*import*.

## Struktur Proyek

```
/job-vacancies-website
│
├── /src              # Direktori sumber kode untuk frontend
│   ├── /components   # Komponen React
│   ├── /pages        # Halaman-halaman aplikasi
│   └── /assets       # File statis (gambar, CSS)
│
├── /backend          # Direktori backend (opsional jika menggunakan Express.js)
│   ├── /routes       # API routes untuk mengambil data dari MySQL
│   └── /models       # Model untuk menghubungkan dengan database
│
├── /database         # File SQL dummy data untuk MySQL
│
└── package.json      # File konfigurasi Node.js
```

## Kontribusi

Jika ingin berkontribusi dalam proyek ini, Anda dapat melakukan *fork* repositori, membuat fitur baru, atau memperbaiki *bug*. Jangan lupa untuk mengajukan *pull request*!

