# Vehicle Rental Booking System API

Project Live URL: https://vehicle-rentel-backend.vercel.app/


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
git clone https://github.com/md-alamin2/ph-l2-assignment-2.git
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

Get 🔐 User Registration
```
https://vehicle-rentel-backend.vercel.app/api/auth/register
```

Get 🔐 User Login
```
https://vehicle-rentel-backend.vercel.app/api/auth/login
```

### Users

Get ⚡ All Users
```
https://vehicle-rentel-backend.vercel.app/api/users
```

Get ⚡ Single User
```
https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

Update ✏️ User Profile
```
https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

Delete 🗑️ User
```
https://vehicle-rentel-backend.vercel.app/api/users/:userId
```

### Vehicles

Post ➕ Add New Vehicle
```
https://vehicle-rentel-backend.vercel.app/api/vehicles
```

Get ⚡ All Vehicles
```
https://vehicle-rentel-backend.vercel.app/api/vehicles
```

Get ⚡ Single Vehicle
```
https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

Update ✏️ Vehicle
```
https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

Delete 🗑️ Vehicle
```
https://vehicle-rentel-backend.vercel.app/api/vehicles/:vehicleId
```

### Bookings

Post ➕ Create Booking
```
https://vehicle-rentel-backend.vercel.app/api/bookings
```

Get ⚡ All Bookings
```
https://vehicle-rentel-backend.vercel.app/api/bookings
```

Update ✏️ Booking Status
```
https://vehicle-rentel-backend.vercel.app/api/bookings/:bookingId
```

---

## 👨‍💻 Developer

**Md. Al-amin**
- Email: mdalamin22671@gmail.com
- GitHub: https://github.com/md-alamin2

---

## 📎 License

This project is open source and free to use for learning and portfolio purposes.