# Bus Booking Application - Frontend-Backend Connectivity Setup

## Architecture Overview
- **Backend**: Spring Boot (Java) running on port 8080
- **Frontend**: React.js running on port 8081
- **Database**: MySQL on port 3306
- **API Communication**: REST APIs with CORS enabled

## URLs Configuration

### Backend URLs
- **Base URL**: `http://localhost:8080`
- **API Endpoints**:
  - Authentication: `/api/auth/login`, `/api/auth/register`
  - Schedules: `/api/schedules`, `/api/schedules/search`
  - Bookings: `/api/bookings`, `/api/bookings/user/{userId}`
  - Tickets: `/api/tickets/book`, `/api/tickets/all`

### Frontend URLs
- **Base URL**: `http://localhost:8081`
- **Environment Variable**: `REACT_APP_API_BASE=http://localhost:8080`

## Quick Start

### 1. Start Both Applications
```bash
./start.sh
```

### 2. Test Connectivity
```bash
./test-connectivity.sh
```

### 3. Manual Start (Alternative)

#### Start Backend:
```bash
cd springapp
./mvnw spring-boot:run
```

#### Start Frontend:
```bash
cd reactapp
npm start
```

## Configuration Files

### Backend Configuration
- **CORS**: Configured in `CorsConfigBean.java` to allow all origins
- **Database**: MySQL connection in `application.properties`
- **Security**: Disabled for development in `SecurityConfig.java`

### Frontend Configuration
- **API Base URL**: Set in `.env` file
- **API Service**: Centralized in `src/services/api.js`
- **Authentication**: Handled in `src/services/authService.js`

## Key Features Fixed

1. **CORS Configuration**: Updated to use `allowedOriginPatterns` instead of `allowedOrigins`
2. **API Service**: Added DELETE method and proper error handling
3. **User Management**: Added User model and repository
4. **Database**: Proper MySQL configuration with auto-creation
5. **Startup Scripts**: Automated startup with process management

## Testing the Connection

1. **Backend Health Check**: `curl http://localhost:8080/api/schedules`
2. **Frontend Access**: Open `http://localhost:8081` in browser
3. **API Communication**: Login/Register should work without CORS errors

## Troubleshooting

### Common Issues:
1. **Port Conflicts**: Kill processes on ports 8080/8081 before starting
2. **Database Connection**: Ensure MySQL is running on port 3306
3. **CORS Errors**: Check browser console for specific CORS issues
4. **API Errors**: Check backend logs for detailed error messages

### Log Files:
- Backend logs: `backend.log`
- Frontend logs: `frontend.log`

## Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE=http://localhost:8080
```

### Backend (application.properties)
```
server.port=8080
spring.datasource.url=jdbc:mysql://localhost:3306/appdb?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=examly
```

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/login | User login |
| POST | /api/auth/register | User registration |
| GET | /api/schedules | Get all schedules |
| GET | /api/schedules/search | Search schedules |
| POST | /api/bookings | Create booking |
| GET | /api/bookings/user/{id} | Get user bookings |
| POST | /api/tickets/book | Book ticket |

The application is now configured for proper frontend-backend connectivity with error-free communication.