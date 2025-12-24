# 🚗 Vehicle Rental Booking System API

> A professional-grade Node.js/Express REST API for comprehensive vehicle rental and booking management with JWT authentication, role-based access control, and advanced booking workflows.

**Live API:** [https://vehicle-rentel-backend.vercel.app/](https://vehicle-rentel-backend.vercel.app/)

---

## Overview

A robust Node.js/Express API for managing vehicle rental bookings with user authentication, vehicle management, and booking tracking. Built with TypeScript for type safety and PostgreSQL for reliable data persistence.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **JWT Authentication** | Secure token-based user registration and login |
| 👤 **User Management** | Create, retrieve, and update user profiles with role-based access |
| 🚙 **Vehicle Management** | Add, view, update, and manage vehicles with availability status |
| 📅 **Booking System** | Create bookings, manage status (active/cancelled/returned), track rental history |
| 🛡️ **Role-Based Access** | Admin and customer roles with appropriate permissions |
| 🚫 **Deletion Constraints** | Prevent deletion of users/vehicles with active bookings |
| ⏰ **Automatic Updates** | Background jobs for expired and overdue bookings |
| 📊 **Standardized Responses** | Consistent JSON error response structure across all endpoints |

---

## 🛠 Technology Stack

| Category | Technology |
|----------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js (v5.2.1) |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **Authentication** | JWT (jsonwebtoken) |
| **Password Security** | bcrypt |
| **Task Scheduling** | node-cron |
| **Dev Runtime** | tsx |

---

## 📁 Project Structure

```
src/
├── server.ts                 # Main application entry point
├── app.ts                    # Express app configuration
├── config/
│   ├── db.ts                # Database connection pool
│   └── index.ts             # Configuration exports
├── middleware/
│   └── verifyRole.ts        # Role-based authentication middleware
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.routes.ts
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.routes.ts
│   ├── vehicle/
│   │   ├── vehicle.controller.ts
│   │   ├── vehicle.service.ts
│   │   └── vehicle.routes.ts
│   └── booking/
│       ├── booking.controller.ts
│       ├── booking.service.ts
│       ├── booking.routes.ts
│       └── autoUpdate.ts
└── type/
    └── express/
        └── index.d.ts
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/md-alamin2/ph-l2-assignment-2.git
cd assignment-2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the project root with the following variables:

```env
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=vehicle_rental_db
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRATION=7d
PORT=5000
NODE_ENV=development
```

---

## ▶️ Running the Application

### Development Mode (with Hot Reload)
```bash
npm run dev
```

### Production Build
```bash
npx tsc
```

---

## 📚 API Endpoints

All endpoints are organized by module with clear authentication requirements:
- 🔐 **Public** - No authentication required
- 🔒 **(Admin & Customer)** - Requires JWT token
- 🛡️ **(Admin Only)** - Admin role required

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `POST /api/auth/register` | User Registration |
| POST | `POST /api/auth/login` | User Login |

**Register User**
```
POST https://vehicle-rentel-backend.vercel.app/api/auth/register
```

**User Login**
```
POST https://vehicle-rentel-backend.vercel.app/api/auth/login
```

---

### 👥 Users

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| GET | 🛡️ Admin Only | `/api/users` | Retrieve all users |
| GET | 🔒 Admin & Customer | `/api/users/:userId` | Get specific user |
| PATCH | 🔒 Admin & Customer | `/api/users/:userId` | Update user profile |
| DELETE | 🔒 Admin & Customer | `/api/users/:userId` | Delete user account |

**Get All Users** 🛡️ (Admin Only)
```
GET https://vehicle-rentel-backend.vercel.app/api/users
```

**Get Single User** 🔒 (Admin & Customer)
```
GET https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

**Update User Profile** 🔒 (Admin & Customer)
```
PATCH https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

**Delete User** 🔒 (Admin & Customer)
```
DELETE https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

---

### 🚗 Vehicles

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| POST | 🛡️ Admin Only | `/api/vehicles` | Add new vehicle |
| GET | 🔐 Public | `/api/vehicles` | List all vehicles |
| GET | 🔐 Public | `/api/vehicles/:vehicleId` | Get vehicle details |
| PATCH | 🛡️ Admin Only | `/api/vehicles/:vehicleId` | Update vehicle |
| DELETE | 🔒 Admin & Customer | `/api/vehicles/:vehicleId` | Delete vehicle |

**Add New Vehicle** 🛡️ (Admin Only)
```
POST https://vehicle-rentel-backend.vercel.app/api/vehicles
```

**Get All Vehicles** 🔐
```
GET https://vehicle-rentel-backend.vercel.app/api/vehicles
```

**Get Single Vehicle** 🔐
```
GET https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

**Update Vehicle** 🛡️ (Admin Only)
```
PATCH https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

**Delete Vehicle** 🔒 (Admin & Customer)
```
DELETE https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

---

### 📅 Bookings

| Method | Access | Endpoint | Description |
|--------|--------|----------|-------------|
| POST | 🔒 Admin & Customer | `/api/bookings` | Create new booking |
| GET | 🔒 Admin & Customer | `/api/bookings` | Get bookings |
| PATCH | 🔒 Admin & Customer | `/api/bookings/:bookingId` | Update booking status |

**Create Booking** 🔒 (Admin & Customer)
```
POST https://vehicle-rentel-backend.vercel.app/api/bookings
```

**Get All Bookings** 🔒 (Admin & Customer)
```
GET https://vehicle-rentel-backend.vercel.app/api/bookings
```

**Update Booking Status** 🔒 (Admin & Customer)
```
PATCH https://vehicle-rentel-backend.vercel.app/api/bookings/:bookingId
```

---

## 👨‍💻 Developer

**Md. Alamin**
- 📧 Email: [mdalamin22671@gmail.com](mailto:mdalamin22671@gmail.com)
- 🔗 GitHub: [github.com/md-alamin2](https://github.com/md-alamin2)

---

## 📎 License

This project is open source and available under the ISC License. Free to use for learning and portfolio purposes.