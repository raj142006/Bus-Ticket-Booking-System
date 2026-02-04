import authService from './authService';

const searchBuses = async (from, to, date) => {
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
  const filteredSchedules = schedules.filter(schedule => 
    schedule.origin.toLowerCase() === from.toLowerCase() && 
    schedule.destination.toLowerCase() === to.toLowerCase()
  );
  
  if (filteredSchedules.length > 0) {
    return { data: filteredSchedules };
  }
  
  // Generate dynamic buses for any route
  const operators = ['SRS Travels', 'VRL Travels', 'KPN Travels', 'RedBus Express', 'Orange Travels'];
  const busTypes = ['AC Sleeper', 'Non-AC Seater', 'AC Semi Sleeper', 'Volvo AC'];
  const fallbackBuses = [];
  
  for (let i = 0; i < 3; i++) {
    fallbackBuses.push({
      id: Date.now() + i,
      operator: operators[i % operators.length],
      busType: busTypes[i % busTypes.length],
      origin: from,
      destination: to,
      departureTime: `${String(8 + i * 4).padStart(2, '0')}:00`,
      arrivalTime: `${String(12 + i * 4).padStart(2, '0')}:00`,
      duration: `${4 + i}h`,
      rating: 3.8 + Math.random() * 1.2,
      price: 400 + i * 150 + Math.random() * 200,
      seatsLeft: 20 + Math.random() * 15,
      bookedSeats: ''
    });
  }
  
  return { data: fallbackBuses };
};

const getScheduleById = async (scheduleId) => {
  const schedules = JSON.parse(localStorage.getItem('schedules') || '[]');
  let schedule = schedules.find(s => s.id == scheduleId);
  
  if (!schedule) {
    schedule = {
      id: scheduleId,
      operator: "SRS Travels",
      busType: "AC Sleeper",
      origin: "Mumbai",
      destination: "Pune",
      departureTime: "08:00",
      arrivalTime: "12:00",
      duration: "4h",
      rating: 4.2,
      price: 450,
      seatsLeft: 40,
      bookedSeats: ''
    };
  }
  
  const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
  const scheduleBookings = storedBookings.filter(b => b.scheduleId == scheduleId && b.bookingStatus === 'CONFIRMED');
  const bookedSeats = scheduleBookings.map(b => b.seatNumbers).join(',');
  
  schedule.bookedSeats = bookedSeats;
  schedule.seatsLeft = Math.max(0, 40 - bookedSeats.split(',').filter(s => s.trim()).length);
  
  return { data: schedule };
};

const createBooking = async (bookingDetails) => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) throw new Error('User not logged in');
  
  const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
  const scheduleBookings = existingBookings.filter(b => b.scheduleId == bookingDetails.scheduleId && b.bookingStatus === 'CONFIRMED');
  const bookedSeats = scheduleBookings.map(b => b.seatNumbers).join(',').split(',').map(s => s.trim()).filter(s => s);
  const requestedSeats = bookingDetails.seatNumbers.split(',').map(s => s.trim());
  
  const conflictSeats = requestedSeats.filter(seat => bookedSeats.includes(seat));
  if (conflictSeats.length > 0) {
    throw new Error(`Seats ${conflictSeats.join(', ')} are already booked`);
  }
  
  const mockBooking = {
    id: Date.now(),
    userId: currentUser.id,
    ...bookingDetails,
    bookingStatus: 'CONFIRMED',
    pnrNumber: 'PNR' + Date.now(),
    bookingDateTime: new Date().toISOString(),
    busName: bookingDetails.busName || bookingDetails.operator || 'SRS Travels'
  };
  
  existingBookings.push(mockBooking);
  localStorage.setItem('userBookings', JSON.stringify(existingBookings));
  
  return { data: mockBooking };
};

const getUserBookings = async () => {
  const currentUser = authService.getCurrentUser();
  if (!currentUser) return { data: [] };
  
  const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
  const userBookings = allBookings.filter(b => b.userId === currentUser.id);
  return { data: userBookings };
};

const cancelTicket = async (bookingId) => {
  const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
  const updatedBookings = existingBookings.map(booking => 
    booking.id == bookingId ? { ...booking, bookingStatus: 'CANCELLED' } : booking
  );
  localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
  return { data: { success: true } };
};

const bookTicket = async (ticketDetails) => {
  return createBooking(ticketDetails);
};

const ticketService = {
  searchBuses,
  getUserBookings,
  cancelTicket,
  createBooking,
  getScheduleById,
  bookTicket,
};

export default ticketService;