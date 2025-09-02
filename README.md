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
│   ├── config/             # Konfigurasi database
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
CLIENT_URL=http://localhost:3000
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

### Case Studies
- `GET /api/case1/fruits` - Data fruits untuk technical test
- `GET /api/case2/comments` - Data comments untuk technical test

## 🗄️ Database

Menggunakan SQLite dengan tabel:
- `reservations` - Menyimpan data reservasi pelanggan

Database akan otomatis dibuat saat server pertama kali dijalankan.

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **Rate Limiting** - Pembatasan request per IP
- **CORS** - Cross-origin resource sharing
- **Input Validation** - Validasi data input
- **Error Handling** - Centralized error management

## 🎨 Features

### Case 1: Technical Test Fruits
- Algoritma pencarian buah unik
- Pengelompokan berdasarkan tipe
- Perhitungan total stock
- Visualisasi data interaktif

### Case 2: Technical Test Comments
- Recursive function untuk nested comments
- Perhitungan total comments
- Visualisasi hierarki comments

### Case 3: Website Rumah Makan Padang
- Hero section yang menggugah selera
- Menu interaktif dengan tabs
- Galeri suasana restaurant
- Form reservasi terintegrasi
- Informasi lokasi dan kontak

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

## 📱 Responsive Design

Website fully responsive untuk:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

## 🎯 Best Practices Implemented

- **Clean Architecture** - Separation of concerns
- **Error Handling** - Comprehensive error management
- **Validation** - Input validation dan sanitization
- **Security** - Multiple security layers
- **Performance** - Optimized database queries
- **Maintainability** - Modular code structure
