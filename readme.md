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
*** Begin File
# Assignment-2 — Vehicle Rental Booking API

Project Live URL: https://your-live-url.example.com

Overview
---
Professional backend API for vehicle rental booking management, including user authentication, role-based access, vehicle administration, and booking workflows.

Features
---
- JWT-based user authentication and registration
- Role-based access control (admin, customer)
- Vehicle CRUD and availability management
- Booking creation, cancellation, and return handling
- Deletion constraints: block deleting users or vehicles with active bookings
- Standardized JSON error responses

Technology Stack
---
- Node.js + Express
- TypeScript
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- bcrypt for password hashing
- node-cron for scheduled jobs

Setup & Usage
---
1) Install dependencies

```bash
npm install
```

2) Create a `.env` file with at minimum:

```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=your_database
JWT_SECRET=your_jwt_secret
PORT=5000
```

3) Run in development mode

```bash
npm run dev
```

4) API base: `http://localhost:<PORT>/api`

If you provide your live URL I will insert it into this file and can add a short deployment note for your chosen provider.

*** End File
   npm install
