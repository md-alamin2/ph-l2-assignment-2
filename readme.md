# Vehicle Rental Booking System API

Project Live URL: https://your-live-url.example.com


Overview
---
A robust Node.js/Express API for managing vehicle rental bookings with user authentication, vehicle management, and booking tracking.


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

3. **Set up environment variables**

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

```bash
# User registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# User login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Users

```bash
# Get all users (admin only)
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get user details
curl -X GET http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update user profile
curl -X PATCH http://localhost:5000/api/users/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'

# Delete user (blocked if active bookings exist)
curl -X DELETE http://localhost:5000/api/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Vehicles

```bash
# Add new vehicle (admin only)
curl -X POST http://localhost:5000/api/vehicles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"vehicle_name":"Tesla Model 3","type":"Electric","registration_number":"ABC123","daily_rent_price":50,"availability_status":"available"}'

# Get all vehicles
curl -X GET http://localhost:5000/api/vehicles

# Get vehicle details
curl -X GET http://localhost:5000/api/vehicles/1

# Update vehicle (admin only)
curl -X PATCH http://localhost:5000/api/vehicles/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"vehicle_name":"Tesla Model S","daily_rent_price":75}'

# Delete vehicle (blocked if active bookings exist)
curl -X DELETE http://localhost:5000/api/vehicles/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Bookings

```bash
# Create new booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"customer_id":1,"vehicle_id":1,"rent_start_date":"2025-12-26","rent_end_date":"2025-12-30"}'

# Get bookings (admin sees all, customers see own)
curl -X GET http://localhost:5000/api/bookings \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update booking status (cancel/return)
curl -X PATCH http://localhost:5000/api/bookings/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"status":"cancelled"}'
```