# Rumah Makan Padang - Digital Platform

[![Node.js](https://img.shields.io/badge/Node.js-16.x+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/SQLite-3.x-blue.svg)](https://sqlite.org/)

> A comprehensive full-stack web application for traditional Padang restaurant management, featuring online ordering system, reservation management, and administrative dashboard.

## 📋 Table of Contents

- [Overview]
- [Features]
- [Tech Stack]
- [Architecture]
- [Getting Started]
- [API Documentation]
- [Database Schema]
- [Security]
- [Deployment]
- [Contributing]


## 🎯 Overview

This project is a modern web application designed specifically for Indonesian Padang restaurants, combining traditional culinary culture with digital innovation. The platform includes three main case studies demonstrating different technical implementations:

1. **Algorithm Implementation** - Fruit categorization system
2. **Data Structure Management** - Nested comments processing
3. **Complete Restaurant Management** - Full-featured ordering and reservation system

### Live Demo
- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Admin Dashboard**: [http://localhost:5173/admin](http://localhost:5173/admin)

## ✨ Features

### 🍽️ Customer Features
- **Interactive Menu System** with categorized food items
- **Smart Shopping Cart** with real-time calculations
- **Multiple Order Types**: Dine-in, Takeaway, and Delivery
- **Table Reservation System** with date/time selection
- **Order Status Tracking** with real-time updates
- **Responsive Design** optimized for all devices
- **Accessibility Support** with ARIA compliance

### 👨‍💼 Admin Features
- **Comprehensive Dashboard** for business analytics
- **Order Management System** with status workflow
- **Reservation Management** with capacity planning
- **Real-time Status Updates** across all orders
- **Customer Data Management** with order history
- **Business Intelligence Reports** (coming soon)

### 🔧 Technical Features
- **RESTful API Architecture** with proper HTTP methods
- **Real-time Data Synchronization** between client and server
- **Advanced Security Implementation** with multiple protection layers
- **Optimized Database Operations** with prepared statements
- **Error Handling & Logging** for production reliability
- **Performance Optimization** with caching strategies

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Lightweight relational database
- **Helmet.js** - Security middleware
- **Express Rate Limit** - API rate limiting
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Nodemon** - Development server auto-restart
- **Git** - Version control system

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Client (React) │────│  Express API    │────│   SQLite DB     │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │   Pages     │ │    │ │ Controllers │ │    │ │ Reservations│ │
│ │   Components│ │    │ │ Middleware  │ │    │ │ Orders      │ │
│ │   Layouts   │ │    │ │ Routes      │ │    │ │ Menu Items  │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Project Structure
```
rumah-makan-project/
├── client/                     # Frontend Application
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── layouts/            # Page layout components
│   │   ├── pages/              # Application pages
│   │   ├── utils/              # Utility functions
│   │   └── styles/             # CSS and styling files
│   ├── package.json
│   └── vite.config.js
├── server/                     # Backend Application
│   ├── controllers/            # Business logic handlers
│   ├── middleware/             # Custom middleware functions
│   ├── routes/                 # API route definitions
│   ├── data/                   # Database files
│   ├── utils/                  # Server utilities
│   ├── package.json
│   └── index.js                # Application entry point
├── docs/                       # Documentation files
├── .gitignore
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v16.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v7.0 or higher) or **yarn** (v1.22 or higher)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kasyifulkurobial/challenge-junior-fullstack.git
   cd rumah-makan-project
   ```

2. **Setup Backend Server**
   ```bash
   cd server
   npm install
   
   # Copy environment template
   cp .env.example .env
   
   # Edit .env file with your configuration
   nano .env
   ```

3. **Configure Environment Variables**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Client Configuration
   CLIENT_URL=http://localhost:5173
   
   # Database Configuration
   DB_PATH=./data/rumah_makan.db
   
   # Security Configuration
   RATE_LIMIT_WINDOW=15
   RATE_LIMIT_MAX_REQUESTS=100
   ```

4. **Setup Frontend Client**
   ```bash
   cd ../client
   npm install
   ```

### Development Mode

Run both servers simultaneously:

```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend development server
cd client
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Admin Dashboard**: http://localhost:5173/admin

### Production Build

```bash
# Build frontend for production
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
Currently using stateless API. Authentication implementation planned for v2.0.

### Endpoints

#### Health Check
```http
GET /api/health
```
Returns server status and uptime information.

#### Orders Management
```http
POST   /api/orders                    # Create new order
GET    /api/orders                    # Get all orders
GET    /api/orders/:id               # Get order by ID
PATCH  /api/orders/:id/status        # Update order status
DELETE /api/orders/:id               # Cancel order
```

#### Reservations Management
```http
POST   /api/reservations             # Create new reservation
GET    /api/reservations             # Get all reservations
GET    /api/reservations/:id         # Get reservation by ID
PATCH  /api/reservations/:id/status  # Update reservation status
DELETE /api/reservations/:id         # Cancel reservation
```

#### Admin Operations
```http
GET    /api/admin/dashboard          # Get dashboard statistics
GET    /api/admin/orders             # Get all orders with admin details
GET    /api/admin/reservations       # Get all reservations with admin details
PATCH  /api/admin/orders/:id/status  # Admin order status update
```

### Request/Response Examples

#### Create Order
```json
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerPhone": "08123456789",
  "orderType": "delivery",
  "items": [
    {
      "name": "Rendang Daging",
      "price": 25000,
      "quantity": 2
    }
  ],
  "totalAmount": 50000,
  "deliveryAddress": "Jl. Malioboro No. 1, Yogyakarta"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "id": 1,
    "customerName": "John Doe",
    "status": "pending",
    "createdAt": "2025-01-15T10:30:00Z",
    "totalAmount": 50000
  },
  "message": "Order created successfully"
}
```

## 🗄️ Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  order_type TEXT CHECK(order_type IN ('dine-in', 'takeaway', 'delivery')) NOT NULL,
  items TEXT NOT NULL, -- JSON string
  total_amount INTEGER NOT NULL,
  delivery_address TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Reservations Table
```sql
CREATE TABLE reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  party_size INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Status Workflows

#### Order Status Flow
```
pending → confirmed → preparing → ready → delivered
    ↓         ↓           ↓         ↓
cancelled cancelled  cancelled cancelled
```

#### Reservation Status Flow
```
pending → confirmed → completed
    ↓         ↓
cancelled cancelled
```

## 🔐 Security

Our application implements multiple security layers:

### Security Features
- **Helmet.js** - Sets various HTTP headers for security
- **CORS Configuration** - Controlled cross-origin resource sharing
- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - Comprehensive data validation on both client and server
- **SQL Injection Prevention** - Parameterized queries using prepared statements
- **XSS Protection** - Input sanitization and output encoding
- **Error Handling** - Secure error messages without sensitive information exposure

### Security Headers
```javascript
// Helmet configuration
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
}));
```

## 🚀 Deployment

### Environment Setup

#### Development
```bash
NODE_ENV=development
npm run dev
```

#### Production
```bash
NODE_ENV=production
npm run build
npm start
```

### Deployment Options

#### Traditional Server Deployment
1. **VPS/Dedicated Server**
   ```bash
   # Clone repository on server
   git clone <repository-url>
   cd rumah-makan-project
   
   # Install dependencies
   npm install --production
   
   # Build frontend
   cd client && npm run build
   
   # Start with PM2
   pm2 start server/index.js --name "rumah-makan"
   ```

2. **Docker Deployment**
   ```dockerfile
   # Dockerfile example
   FROM node:16-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 5000
   CMD ["npm", "start"]
   ```

#### Cloud Platforms
- **Heroku** - Easy deployment with git integration
- **Vercel** - Optimized for React applications
- **Railway** - Simple full-stack deployment
- **DigitalOcean App Platform** - Managed container platform

### Performance Optimization
- **Gzip Compression** enabled for all text resources
- **Static File Caching** with appropriate cache headers
- **Database Indexing** on frequently queried columns
- **Image Optimization** with WebP format support
- **Lazy Loading** for non-critical resources

## 🧪 Testing

### Running Tests
```bash
# Backend tests
cd server
npm test

# Frontend tests
cd client
npm test

# E2E tests
npm run test:e2e
```

### Test Coverage
- **Unit Tests** - Individual component/function testing
- **Integration Tests** - API endpoint testing
- **E2E Tests** - Complete user workflow testing
- **Performance Tests** - Load and stress testing

## 🤝 Contributing

We welcome contributions from the community! Please follow these guidelines:

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards
- Follow **ESLint** configuration
- Maintain **90%+ test coverage**
- Use **conventional commit messages**
- Update **documentation** for new features
- Ensure **accessibility compliance**

### Bug Reports
Please use the issue tracker to report bugs. Include:
- **Environment details** (OS, Node version, browser)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Screenshots** if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Documentation**: [Wiki Pages](https://github.com/kasyifulkurobial/challenge-junior-fullstack/wiki)
- **Issues**: [GitHub Issues](https://github.com/kasyifulkurobial/challenge-junior-fullstack/issues)
- **Discussions**: [GitHub Discussions](https://github.com/kasyifulkurobial/challenge-junior-fullstack/discussions)

## 🙏 Acknowledgments

- **Indonesia Culinary Heritage** - For inspiring traditional Padang cuisine representation
- **Open Source Community** - For the amazing tools and libraries
- **Contributors** - Thank you to everyone who has contributed to this project

---

**Built with love for Indonesian UMKM community**

*Last updated: 3 September 2025*