import api from './api';

const generateFallbackBuses = (from, to) => {
  const operators = ["RedBus Express", "VRL Travels", "SRS Travels", "Kallada Travels", "Volvo Express", "KPN Travels", "Orange Travels", "Parveen Travels", "Jabbar Travels", "Shivneri Travels", "MSRTC", "Royal Cruiser"];
  const busTypes = ["AC Sleeper", "Non-AC Sleeper", "AC Semi Sleeper", "Non-AC Seater", "Volvo AC", "Multi Axle"];
  
  const buses = [];
  for (let i = 0; i < 3; i++) {
    const basePrice = 300 + Math.random() * 800;
    const hours = 3 + Math.random() * 10;
    const departureHour = 6 + Math.floor(Math.random() * 18);
    const arrivalHour = (departureHour + Math.floor(hours)) % 24;
    
    buses.push({
      id: Date.now() + i,
      operator: operators[i % operators.length],
      busType: busTypes[i % busTypes.length],
      origin: from,
      destination: to,
      departureTime: `${String(departureHour).padStart(2, '0')}:00`,
      arrivalTime: `${String(arrivalHour).padStart(2, '0')}:00${hours > 18 ? '+1' : ''}`,
      duration: `${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`,
      rating: 3.5 + Math.random() * 1.5,
      price: Math.floor(basePrice),
      seatsLeft: 15 + Math.floor(Math.random() * 25)
    });
  }
  return buses;
};

export const searchBuses = async (from, to) => {
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
  const filteredSchedules = schedules.filter(schedule => 
    schedule.origin.toLowerCase() === from.toLowerCase() && 
    schedule.destination.toLowerCase() === to.toLowerCase()
  );
  
  return filteredSchedules.length > 0 ? filteredSchedules : generateFallbackBuses(from, to);
};

export const getAllCities = async () => {
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
  const cities = [...new Set(schedules.flatMap(s => [s.origin, s.destination]))];
  return cities.length > 0 ? cities.sort() : [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'
  ];
};

export const getScheduleById = async (id) => {
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
  return schedules.find(s => s.id == id) || generateFallbackBuses('Mumbai', 'Pune')[0];
};

export const getAllSchedules = async () => {
  return JSON.parse(localStorage.getItem('schedules') || '[]');
};