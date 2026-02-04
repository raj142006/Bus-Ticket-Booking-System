#!/bin/bash

echo "Starting Frontend-Only Bus Booking Application..."

# Kill any existing process on port 8081
fuser -k 8081/tcp 2>/dev/null || true
sleep 2

# Navigate to React app directory
cd reactapp

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start React app
echo "Starting React frontend on port 8081..."
DANGEROUSLY_DISABLE_HOST_CHECK=true PORT=8081 npm start

echo "Frontend started!"
echo "Access the application at: http://localhost:8081"