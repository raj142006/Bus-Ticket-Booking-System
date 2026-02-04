// src/pages/BookTicket.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SeatLayout from '../components/SeatLayout';
import ticketService from '../services/ticketService'; // Make sure this is imported
import './BookTicket.css';

const BookTicket = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate(); // Hook for navigation

  const [scheduleDetails, setScheduleDetails] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [insuranceType, setInsuranceType] = useState('BASIC');

  // Fetch the schedule details when the component loads
  useEffect(() => {
    const fetchScheduleDetails = () => {
      ticketService.getScheduleById(scheduleId)
        .then(response => {
          setScheduleDetails(response.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to fetch schedule details:", err);
          setLoading(false);
        });
    };
    
    fetchScheduleDetails();
    
    // Refresh schedule data every 10 seconds to get latest seat availability
    const interval = setInterval(fetchScheduleDetails, 10000);
    return () => clearInterval(interval);
  }, [scheduleId]);

  // This function gets the selected seats and price from the SeatLayout component
  const handleSeatSelection = (seats, price) => {
    setSelectedSeats(seats);
    setTotalPrice(price);
  };

  // This function handles the final booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    // Construct a complete booking object
    const bookingDetails = {
      scheduleId: parseInt(scheduleId),
      origin: scheduleDetails.origin,
      destination: scheduleDetails.destination,
      travelDate: "2025-10-27",
      seatNumbers: selectedSeats.join(', '),
      totalAmount: totalPrice,
      passengerName: passengerName,
      passengerEmail: passengerEmail,
      busName: scheduleDetails.operator,
    };

   

    try {
      await ticketService.createBooking(bookingDetails);
      alert(`Booking confirmed! Redirecting to your bookings page.`);
      // Navigate to the 'My Bookings' page to see the result immediately
      navigate('/my-bookings');
    } catch (error) {
      alert('Failed to create booking. Please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading schedule details...</div>;
  }
  
  if (!scheduleDetails) {
    return <div>Sorry, this schedule could not be found.</div>
  }

  return (
    <div className="booking-page">
      <div className="booking-container">
        <div className="booking-header">
          <h1>🎫 Book Your Ticket</h1>
          <p>Complete your booking for <strong>{scheduleDetails.origin}</strong> to <strong>{scheduleDetails.destination}</strong></p>
        </div>
        
        <div className="bus-details">
          <h3>🚌 {scheduleDetails.operator}</h3>
          <div className="bus-info-grid">
            <div className="bus-info-item">
              <div className="bus-info-label">Bus Type</div>
              <div className="bus-info-value">{scheduleDetails.busType}</div>
            </div>
            <div className="bus-info-item">
              <div className="bus-info-label">Departure</div>
              <div className="bus-info-value">{scheduleDetails.departureTime}</div>
            </div>
            <div className="bus-info-item">
              <div className="bus-info-label">Arrival</div>
              <div className="bus-info-value">{scheduleDetails.arrivalTime}</div>
            </div>
            <div className="bus-info-item">
              <div className="bus-info-label">Duration</div>
              <div className="bus-info-value">{scheduleDetails.duration}</div>
            </div>
          </div>
        </div>
        
        <div className="seat-selection-placeholder">
          <h3>💺 Select Your Seats</h3>
          <p>Choose your preferred seats from the layout below</p>
        </div>
        
        <SeatLayout 
          key={scheduleDetails.bookedSeats} 
          bookedSeats={scheduleDetails.bookedSeats}
          pricePerSeat={scheduleDetails.price}
          onSeatSelect={handleSeatSelection}
        />
        
        <div className="booking-summary">
          <h3>📋 Booking Summary</h3>
          <p>Selected Seats: <strong>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</strong></p>
          <p>Total Price: <strong>₹{totalPrice}</strong></p>
        </div>

        <form onSubmit={handleBooking} className="passenger-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your full name" 
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              value={passengerEmail}
              onChange={(e) => setPassengerEmail(e.target.value)}
              required 
            />
          </div>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookTicket;