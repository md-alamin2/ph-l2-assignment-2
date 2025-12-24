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