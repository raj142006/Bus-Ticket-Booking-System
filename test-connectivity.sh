#!/bin/bash

echo "Testing Backend-Frontend Connectivity..."

# Test backend health
echo "1. Testing backend (http://localhost:8080)..."
curl -s http://localhost:8080/api/schedules > /dev/null
if [ $? -eq 0 ]; then
    echo "✓ Backend is running and accessible"
else
    echo "✗ Backend is not accessible"
fi

# Test CORS
echo "2. Testing CORS configuration..."
curl -s -H "Origin: http://localhost:8081" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:8080/api/schedules > /dev/null
if [ $? -eq 0 ]; then
    echo "✓ CORS is properly configured"
else
    echo "✗ CORS configuration issue"
fi

# Test API endpoints
echo "3. Testing key API endpoints..."
endpoints=("/api/schedules" "/api/bookings" "/api/auth/login")

for endpoint in "${endpoints[@]}"; do
    response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080$endpoint)
    if [ "$response" = "200" ] || [ "$response" = "405" ]; then
        echo "✓ $endpoint - OK"
    else
        echo "✗ $endpoint - HTTP $response"
    fi
done

echo "4. Testing frontend (http://localhost:8081)..."
curl -s http://localhost:8081 > /dev/null
if [ $? -eq 0 ]; then
    echo "✓ Frontend is running and accessible"
else
    echo "✗ Frontend is not accessible"
fi

echo "Connectivity test completed!"