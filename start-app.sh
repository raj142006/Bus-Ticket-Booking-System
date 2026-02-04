#!/bin/bash

echo "🚀 Starting Bus Booking Application..."

# Start Spring Boot backend
echo "📡 Starting Backend Server..."
cd springapp
./mvnw spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 15

# Start React frontend
echo "🌐 Starting Frontend Server..."
cd ../reactapp
npm start &
FRONTEND_PID=$!

echo "✅ Application started successfully!"
echo "🌐 Frontend: http://localhost:3000"
echo "📡 Backend: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID