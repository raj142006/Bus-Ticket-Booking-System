#!/bin/bash

echo "Starting Bus Booking Application..."

# Kill any existing processes
fuser -k 8080/tcp 2>/dev/null || true
fuser -k 8081/tcp 2>/dev/null || true
sleep 2

# Start backend in background
echo "Starting Spring Boot backend on port 8080..."
cd springapp
./mvnw clean compile spring-boot:run -Dspring-boot.run.jvmArguments="-Dserver.address=0.0.0.0" > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait for backend to start
echo "Waiting for backend to start..."
sleep 20

# Test backend health
echo "Testing backend health..."
curl -f http://localhost:8080/health || echo "Backend health check failed"

# Start frontend
echo "Starting React frontend on port 8081..."
cd ../reactapp
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo "Application started!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo "Frontend: http://localhost:8081"
echo "Backend: http://localhost:8080"
echo "Health: http://localhost:8080/health"
echo "Logs: backend.log and frontend.log"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID