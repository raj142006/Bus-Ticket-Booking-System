// src/services/mockData.js

const generateRoutes = () => {
  const cities = ['Coimbatore', 'Chennai', 'Bangalore', 'Madurai', 'Mumbai', 'Pune', 'Delhi', 'Hyderabad', 'Kolkata', 'Jaipur', 'Agra', 'Chandigarh', 'Vijayawada', 'Nashik', 'Goa', 'Bhubaneswar'];
  const operators = ['KPN Travels', 'SRS Travels', 'VRL Travels', 'Orange Travels', 'Parveen Travels', 'Setc Travels', 'YBM Travels', 'City Travels', 'Kallada Travels', 'Vetri Travels', 'National Travels', 'Royal Travels', 'RedBus Travels', 'Shivneri Travels', 'Maharashtra Travels', 'Volvo Travels', 'Rajasthan Travels', 'Punjab Travels', 'Telangana Travels', 'Andhra Travels', 'Pune Travels', 'Deccan Travels', 'Bengal Travels', 'Tamil Travels', 'Pandian Travels', 'Express Travels', 'South Travels', 'Metro Travels', 'Western Express', 'Bombay Travels', 'Capital Express', 'North Travels', 'Karnataka Travels', 'Silicon Travels', 'Jaipur Express', 'Pink City Travels', 'Agra Express', 'Taj Travels', 'Chandigarh Express', 'Goa Express', 'Coastal Travels', 'Nashik Express', 'Wine City Travels', 'Vijayawada Express', 'Temple City Travels', 'South Tamil Travels', 'East Express', 'Deccan Express', 'South Express', 'Maharashtra Express', 'Western Travels'];
  const busTypes = ['AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo AC'];
  
  const distanceMap = {
    'Coimbatore-Chennai': {duration: '8h', price: 800},
    'Coimbatore-Bangalore': {duration: '7h', price: 650},
    'Coimbatore-Madurai': {duration: '4h', price: 350},
    'Coimbatore-Mumbai': {duration: '18h', price: 1800},
    'Coimbatore-Pune': {duration: '15h', price: 1500},
    'Coimbatore-Delhi': {duration: '30h', price: 3000},
    'Coimbatore-Hyderabad': {duration: '14h', price: 1400},
    'Chennai-Bangalore': {duration: '7h', price: 700},
    'Chennai-Madurai': {duration: '8h', price: 800},
    'Chennai-Mumbai': {duration: '22h', price: 2200},
    'Chennai-Pune': {duration: '18h', price: 1800},
    'Chennai-Delhi': {duration: '28h', price: 2800},
    'Chennai-Hyderabad': {duration: '11h', price: 1100},
    'Bangalore-Mumbai': {duration: '16h', price: 1600},
    'Bangalore-Pune': {duration: '12h', price: 1200},
    'Bangalore-Delhi': {duration: '26h', price: 2600},
    'Bangalore-Hyderabad': {duration: '10h', price: 1000},
    'Mumbai-Pune': {duration: '3h 30m', price: 400},
    'Mumbai-Delhi': {duration: '18h', price: 1800},
    'Mumbai-Hyderabad': {duration: '12h', price: 1200},
    'Mumbai-Nashik': {duration: '4h', price: 350},
    'Mumbai-Goa': {duration: '12h', price: 1100},
    'Delhi-Jaipur': {duration: '5h', price: 500},
    'Delhi-Agra': {duration: '4h', price: 450},
    'Delhi-Chandigarh': {duration: '5h', price: 400},
    'Hyderabad-Vijayawada': {duration: '5h', price: 500},
    'Pune-Nashik': {duration: '4h 30m', price: 300},
    'Pune-Goa': {duration: '10h', price: 1000},
    'Kolkata-Bhubaneswar': {duration: '10h', price: 750},
    'Kolkata-Delhi': {duration: '20h', price: 2000},
    'Jaipur-Mumbai': {duration: '14h', price: 1400},
    'Agra-Jaipur': {duration: '5h', price: 500}
  };
  
  const routes = [];
  let id = 1;
  
  cities.forEach(origin => {
    cities.forEach(destination => {
      if (origin !== destination) {
        const routeKey = `${origin}-${destination}`;
        const reverseKey = `${destination}-${origin}`;
        const routeData = distanceMap[routeKey] || distanceMap[reverseKey] || {duration: '12h', price: 1200};
        
        for (let i = 0; i < 3; i++) {
          const operator = operators[Math.floor(Math.random() * operators.length)];
          const busType = busTypes[Math.floor(Math.random() * busTypes.length)];
          const basePrice = routeData.price;
          const priceVariation = Math.floor(Math.random() * 400) - 200;
          const finalPrice = Math.max(200, basePrice + priceVariation);
          
          const departureHour = Math.floor(Math.random() * 24);
          const departureMinute = Math.random() < 0.5 ? '00' : '30';
          const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute}`;
          
          const durationHours = parseInt(routeData.duration);
          const arrivalHour = (departureHour + durationHours) % 24;
          const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${departureMinute}`;
          
          const rating = (3.5 + Math.random() * 1.5).toFixed(1);
          const seatsLeft = Math.floor(Math.random() * 30) + 5;
          const bookedSeats = [`${String.fromCharCode(65 + Math.floor(Math.random() * 8))}${Math.floor(Math.random() * 4) + 1}`];
          
          routes.push({
            id: id++,
            operator,
            type: busType,
            origin,
            destination,
            departureTime,
            arrivalTime,
            duration: routeData.duration,
            rating: parseFloat(rating),
            price: finalPrice,
            seatsLeft,
            bookedSeats
          });
        }
      }
    });
  });
  
  return routes;
};

const initialSchedules = generateRoutes();

export const initializeMockData = () => {
  localStorage.setItem('schedules', JSON.stringify(initialSchedules));
  
  if (!localStorage.getItem('users')) {
    const initialUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@app.com',
        password: 'admin123',
        role: 'ADMIN'
      },
      {
        id: 2,
        name: 'Travel Agent',
        email: 'agent@app.com',
        password: 'agent123',
        role: 'TRAVEL_AGENT'
      },
      {
        id: 3,
        name: 'John Passenger',
        email: 'passenger@app.com',
        password: 'pass123',
        role: 'PASSENGER'
      },
      {
        id: 4,
        name: 'Driver Kumar',
        email: 'driver@app.com',
        password: 'driver123',
        role: 'DRIVER',
        busNumber: 'TN-01-AB-1234',
        assignedScheduleId: 1
      },
      {
        id: 5,
        name: 'Fleet Manager Singh',
        email: 'fleet@app.com',
        password: 'fleet123',
        role: 'FLEET_MANAGER'
      },
      {
        id: 6,
        name: 'Bus Operator Patel',
        email: 'operator@app.com',
        password: 'operator123',
        role: 'BUS_OPERATOR'
      }
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify([]));
  }
};