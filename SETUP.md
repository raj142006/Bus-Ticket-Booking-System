# Bus Booking Application Setup

## Quick Start

1. **Start the application:**
   ```bash
   ./start.sh
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080

## Manual Setup

### Backend (Spring Boot)
```bash
cd springapp
./mvnw spring-boot:run
```

### Frontend (React)
```bash
cd reactapp
npm install
npm start
```

## API Endpoints

- `GET /api/schedules` - Get all schedules
- `GET /api/schedules/search?origin=Mumbai&destination=Pune` - Search buses
- `GET /api/schedules/cities` - Get all cities
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/{userId}` - Get user bookings
- `PUT /api/bookings/cancel/{id}` - Cancel booking
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

## Test Credentials
- Email: admin@example.com
- Password: password

## Features Connected
✅ Bus search with real API
✅ City dropdown from backend
✅ Booking creation
✅ User bookings display
✅ Ticket cancellation
✅ Authentication flow