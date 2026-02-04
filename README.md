# 🚌 BusBooker - Online Bus Ticket Booking System

A comprehensive full-stack web application for online bus ticket booking, featuring a modern React frontend and a robust Spring Boot backend with JWT authentication.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.0.1-6DB33F?style=for-the-badge&logo=springboot)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [User Roles](#user-roles)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 🎯 Overview

**BusBooker** is India's largest simulated online bus ticket booking platform, designed to provide a seamless booking experience with features like real-time seat selection, multiple user roles, and a beautiful modern UI with animations and particle effects.

---

## ✨ Features

### 🎫 Core Booking Features
- **Smart Search** - Search buses between cities with date filters
- **Interactive Seat Layout** - Visual seat selection with real-time availability
- **Booking Management** - View, track, and manage all your bookings
- **Animated UI** - Modern design with particle backgrounds and smooth animations

### 🔐 Authentication & Security
- **JWT Authentication** - Secure token-based authentication
- **Role-Based Access Control** - Multiple user roles with different permissions
- **Protected Routes** - Secure access to dashboards and booking features

### 👥 Multi-Role Dashboard System
- **Passenger Dashboard** - Book tickets, view history, manage profile
- **Admin Dashboard** - Complete system management and oversight
- **Travel Agent Dashboard** - Manage bookings for customers
- **Driver Dashboard** - View assigned routes and schedules
- **Fleet Manager Dashboard** - Manage bus fleet and maintenance
- **Bus Operator Dashboard** - Manage buses and routes

### 🎨 Modern UI/UX
- Responsive design for all devices
- Interactive particle background animations
- Animated statistics counters
- Customer testimonials carousel
- Toast notifications system
- Scroll-to-top functionality

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router DOM | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icon library |
| CSS3 | Styling with animations |

### Backend
| Technology | Purpose |
|------------|---------|
| Spring Boot 3.0 | Backend framework |
| Spring Security 6 | Authentication & authorization |
| Spring Data JPA | Database ORM |
| H2 Database | In-memory database |
| JWT (JJWT) | Token-based auth |
| Lombok | Code generation |
| OpenAPI/Swagger | API documentation |

---

## 📁 Project Structure

```
bus-booking-system/
├── reactapp/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── BookTicket.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TicketList.jsx
│   │   │   ├── SeatLayout.jsx
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── ScrollToTop.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── ...
│   │   ├── pages/              # Page components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AuthPage.js
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── DriverDashboard.jsx
│   │   │   ├── FleetManagerDashboard.jsx
│   │   │   ├── BusOperatorDashboard.jsx
│   │   │   ├── TravelAgentDashboard.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── ...
│   │   ├── context/            # React Context (Auth)
│   │   ├── services/           # API services
│   │   ├── utils/              # Utility functions
│   │   └── App.js              # Main App component
│   └── package.json
│
├── springapp/                  # Spring Boot Backend
│   ├── src/main/java/com/examly/springapp/
│   │   ├── configuration/      # Security & app config
│   │   ├── controller/         # REST controllers
│   │   ├── model/              # Entity models
│   │   ├── repository/         # JPA repositories
│   │   ├── service/            # Business logic
│   │   ├── util/               # Utility classes
│   │   └── exception/          # Custom exceptions
│   └── pom.xml
│
├── SETUP.md                    # Setup instructions
├── CONNECTIVITY_SETUP.md       # Connectivity guide
└── README.md
```

---

## 🚀 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Java JDK 17** or higher
- **Maven** (v3.8+)

### Clone the Repository
```bash
git clone https://github.com/yourusername/bus-booking-system.git
cd bus-booking-system
```

### Backend Setup
```bash
cd springapp
mvn clean install
```

### Frontend Setup
```bash
cd reactapp
npm install
```

---

## ▶️ Running the Application

### Start Backend Server
```bash
cd springapp
mvn spring-boot:run
```
The backend server will start on `http://localhost:8080`

### Start Frontend Development Server
```bash
cd reactapp
npm start
```
The frontend will start on `http://localhost:8081`

### Quick Start (Both servers)
```bash
./start-app.sh
```

---

## 📚 API Documentation

Once the backend is running, access the Swagger UI documentation at:
```
http://localhost:8080/swagger-ui.html
```

### Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User authentication |
| GET | `/api/buses` | Get all buses |
| GET | `/api/schedules` | Get bus schedules |
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings/user` | Get user bookings |

---

## 👤 User Roles

| Role | Access Level |
|------|-------------|
| **PASSENGER** | Book tickets, view bookings, manage profile |
| **ADMIN** | Full system access, user management, analytics |
| **TRAVEL_AGENT** | Book on behalf of customers, manage commissions |
| **DRIVER** | View assigned routes, update trip status |
| **FLEET_MANAGER** | Manage buses, maintenance schedules |
| **BUS_OPERATOR** | Manage routes, schedules, pricing |

---

## 🖼️ Screenshots

### Home Page
- Beautiful hero section with particle animation background
- Smart city search with autocomplete
- Feature cards showcasing platform benefits
- Customer testimonials carousel
- Animated statistics section

### Ticket Search
- Filter by source, destination, and date
- View detailed bus information
- Check seat availability
- Compare prices and amenities

### Seat Selection
- Interactive seat layout
- Real-time seat status (available/booked)
- Easy seat selection process

### Dashboards
- Role-specific dashboards with relevant features
- Clean and intuitive navigation
- Data tables and management tools

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---


<div align="center">
  <p>Made with ❤️ for seamless travel experiences</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
