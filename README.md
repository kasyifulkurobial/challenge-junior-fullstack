# Rumah Makan UMKM Website

Website UMKM untuk rumah makan Padang dengan 3 case study: technical test fruits, comments, dan website rumah makan lengkap.

## 🏗️ Struktur Project

\`\`\`
rumah-makan-project/
├── client/                 # Frontend React + Vite
│   ├── src/
│   │   ├── components/     # Komponen reusable
│   │   ├── layouts/        # Halaman layout
│   │   ├── pages/          # Halaman utama
│   │   └── main.jsx        # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Express.js
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── routes/             # API routes
│   ├── data/               # Database files
│   ├── package.json
│   └── index.js          # Server entry point
└── README.md
\`\`\`

## 🚀 Instalasi dan Setup

### Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn

### 1. Clone Repository
\`\`\`bash
git clone <repository-url>
cd rumah-makan-project
\`\`\`

### 2. Setup Backend (Server)
\`\`\`bash
cd server
npm install
\`\`\`

Buat file `.env` dari template:
\`\`\`bash
cp .env.example .env
\`\`\`

Edit file `.env` sesuai kebutuhan:
\`\`\`env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
\`\`\`

Jalankan server:
\`\`\`bash
# Development mode
npm run dev

# Production mode
npm start
\`\`\`

Server akan berjalan di `http://localhost:5000`

### 3. Setup Frontend (Client)
Buka terminal baru:
\`\`\`bash
cd client
npm install
\`\`\`

Jalankan development server:
\`\`\`bash
npm run dev
\`\`\`

Client akan berjalan di `http://localhost:5173`

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Status server

### Reservations
- `POST /api/reservations` - Buat reservasi baru
- `GET /api/reservations` - Ambil semua reservasi

### Orders (NEW)
- `POST /api/orders` - Buat pesanan baru
- `GET /api/orders` - Ambil semua pesanan

### Admin Management (NEW)
- `GET /api/admin/orders` - Kelola semua pesanan
- `PATCH /api/admin/orders/:id/status` - Update status pesanan
- `GET /api/admin/reservations` - Kelola semua reservasi
- `PATCH /api/admin/reservations/:id/status` - Update status reservasi

## 🗄️ Database

Menggunakan SQLite dengan tabel:
- `reservations` - Menyimpan data reservasi pelanggan
- `orders` - Menyimpan data pesanan makanan (NEW)

Database akan otomatis dibuat saat server pertama kali dijalankan.

## 🛡️ Security Features

- **Helmet.js** - Security headers dengan CSP policy
- **Rate Limiting** - Pembatasan request per IP (100 req/15 menit)
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Validasi data input yang komprehensif
- **Error Handling** - Centralized error management
- **SQL Injection Protection** - Prepared statements

## 🎨 Features

### Case 1: Technical Test Fruits
- Algoritma pencarian buah unik
- Pengelompokan berdasarkan tipe
- Perhitungan total stock
- Visualisasi data interaktif

### Case 2: Technical Test Comments (ENHANCED)
- **Multi-page navigation** dengan navbar khusus
- Recursive function untuk nested comments
- Perhitungan total comments dengan breakdown detail
- Visualisasi hierarki comments
- Halaman terpisah untuk algoritma, visualisasi, dan breakdown

### Case 3: Website Rumah Makan Padang (ENHANCED)
- Hero section yang menggugah selera
- **Sistem pemesanan online lengkap** dengan keranjang
- Menu interaktif dengan tabs (Makanan Utama, Minuman, Makanan Ringan)
- **3 jenis pesanan**: Makan di tempat, Bungkus, Antar
- Form reservasi terintegrasi dengan validasi
- Galeri suasana restaurant
- **Admin dashboard** untuk mengelola pesanan dan reservasi
- Informasi lokasi dan kontak lengkap

## 🛒 Sistem Pemesanan Online (NEW)

### Fitur Pelanggan:
- **Keranjang belanja** dengan floating cart button
- **Tambah/kurang quantity** item
- **Pilihan jenis pesanan**: Dine-in, Takeaway, Delivery
- **Form pemesanan** dengan validasi lengkap
- **Alamat pengantaran** untuk delivery
- **Kalkulasi total** otomatis

### Fitur Admin:
- **Dashboard admin** untuk mengelola pesanan
- **Update status pesanan**: Pending → Confirmed → Preparing → Ready → Delivered
- **Manajemen reservasi** dengan status tracking
- **View detail pesanan** dengan breakdown items
- **Filter dan sorting** berdasarkan status dan tanggal

## 🔧 Development

### Menjalankan dalam Development Mode
\`\`\`bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
\`\`\`

### Build untuk Production
\`\`\`bash
# Build frontend
cd client
npm run build

# Start production server
cd server
npm start
\`\`\`

### Akses Admin Dashboard
Buka `http://localhost:5173/admin` untuk mengakses dashboard admin (dalam development)

## 📱 Responsive Design

Website fully responsive untuk:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## ♿ Accessibility Features (FIXED)

- **ARIA labels** pada semua button dan form elements
- **Proper form labels** dengan htmlFor attributes
- **Screen reader support** dengan sr-only classes
- **Keyboard navigation** support
- **Focus management** dengan proper focus indicators
- **Role attributes** untuk dynamic content
- **Alt text** untuk semua images

## 🎯 Best Practices Implemented

- **Clean Architecture** - MVC pattern dengan separation of concerns
- **Error Handling** - Comprehensive error management dengan try-catch
- **Validation** - Input validation dan sanitization di client dan server
- **Security** - Multiple security layers (Helmet, CORS, Rate Limiting)
- **Performance** - Optimized database queries dengan prepared statements
- **Maintainability** - Modular code structure dengan proper file organization
- **User Experience** - Loading states, error messages, success feedback
- **Database Design** - Normalized tables dengan proper indexing

## 🚨 Troubleshooting

### Common Issues:

1. **Port sudah digunakan**
   \`\`\`bash
   # Ganti port di .env file atau kill process
   lsof -ti:5000 | xargs kill -9
   \`\`\`

2. **Database error**
   \`\`\`bash
   # Hapus database dan restart server
   rm server/rumah_makan.db
   npm run dev
   \`\`\`

3. **CORS error**
   - Pastikan CLIENT_URL di .env sesuai dengan port frontend
   - Default: `CLIENT_URL=http://localhost:5173`

4. **Module not found**
   \`\`\`bash
   # Reinstall dependencies
   rm -rf node_modules package-lock.json
   npm install
   \`\`\`

## 📈 Status Pesanan

### Order Status Flow:
1. **pending** - Pesanan baru masuk
2. **confirmed** - Pesanan dikonfirmasi admin
3. **preparing** - Sedang dimasak
4. **ready** - Siap diambil/diantar
5. **delivered** - Selesai (untuk takeaway/delivery)
6. **cancelled** - Dibatalkan

### Reservation Status Flow:
1. **pending** - Reservasi baru
2. **confirmed** - Reservasi dikonfirmasi
3. **completed** - Selesai
4. **cancelled** - Dibatalkan

## 🔮 Future Enhancements

- [ ] Payment gateway integration
- [ ] Real-time notifications
- [ ] Customer loyalty program
- [ ] Inventory management
- [ ] Sales reporting
- [ ] Mobile app version
- [ ] Multi-language support
