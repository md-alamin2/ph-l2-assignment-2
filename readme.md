# Vehicle Rental Booking System API

A robust Node.js/Express API for managing vehicle rental bookings with user authentication, vehicle management, and booking tracking.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Database Schema](#database-schema)

## ✨ Features

- **User Authentication**: JWT-based login and registration
- **User Management**: Create, retrieve, and update user profiles
- **Vehicle Management**: Add, view, update, and manage vehicles
- **Booking System**: Create bookings, manage booking status, and track rental history
- **Role-Based Access Control**: Admin and customer roles with appropriate permissions
- **Deletion Constraints**: Prevent deletion of users/vehicles with active bookings
- **Automatic Booking Updates**: Scheduled background jobs for expired bookings
- **Error Handling**: Standardized error response structure across all endpoints

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Task Scheduling**: node-cron
- **Development**: tsx (TypeScript runner)

## 📁 Project Structure

```
src/
├── server.ts                 # Main application entry point
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
│       └── autoUpdate.ts     # Automatic booking status updates
└── type/
    └── express/
        └── index.d.ts        # Express type definitions
```

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assignment-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Connection
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_database_name

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRATION=7d

# Server
PORT=5000
NODE_ENV=development
```

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will start with hot-reload enabled using `tsx watch`.

### Building for Production
```bash
npx tsc
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login (returns JWT token)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:userId` - Get user details
- `PATCH /api/users/:userId` - Update user profile
- `DELETE /api/users/:userId` - Delete user (blocked if active bookings exist)

### Vehicles
- `POST /api/vehicles` - Add new vehicle (admin only)
- `GET /api/vehicles` - Get all vehicles
- `GET /api/vehicles/:vehicleId` - Get vehicle details
- `PATCH /api/vehicles/:vehicleId` - Update vehicle (admin only)
- `DELETE /api/vehicles/:vehicleId` - Delete vehicle (blocked if active bookings exist)

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings` - Get bookings (admin sees all, customers see own)
- `PATCH /api/bookings/:bookingId` - Update booking status (cancel/return)

## 📋 Error Handling

All error responses follow a standard structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": "Detailed error information"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., deletion constraint violations)
- `500` - Internal Server Error

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Vehicles Table
```sql
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  vehicle_name VARCHAR(255) NOT NULL,
  type VARCHAR(100),
  registration_number VARCHAR(50) UNIQUE,
  daily_rent_price DECIMAL(10, 2),
  availability_status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES users(id),
  vehicle_id INTEGER REFERENCES vehicles(id),
  rent_start_date DATE,
  rent_end_date DATE,
  total_price DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Business Rules

### Deletion Constraints
- **Users**: Cannot be deleted if they have active bookings
- **Vehicles**: Cannot be deleted if they have active bookings
- Active bookings are those with status = 'active'

### Booking Rules
- Start date cannot be in the past
- End date must be after start date
- Vehicle must have 'available' status to be booked
- Minimum booking duration is 1 day
- Total price = daily_rent_price × number_of_days

### Status Management
- **Active**: Booking is currently ongoing
- **Cancelled**: Booking was cancelled by customer/admin
- **Returned**: Vehicle has been returned after rental period

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

## 📄 License

ISC