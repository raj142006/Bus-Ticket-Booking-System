// src/components/BookingCard.jsx
import React from 'react';
import './BookingCard.css';

const BookingCard = ({ booking, onCancel }) => {
  const travelDate = new Date(booking?.travelDate).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    // This className logic changes the card's border color based on status
    <div className={`booking-card status-${booking?.bookingStatus?.toLowerCase()}`}>
      <div className="card-header">
        <div>
          <span className="route">{booking?.origin || 'N/A'} → {booking?.destination || 'N/A'}</span>
          <span className="pnr">PNR: {booking?.pnrNumber || 'N/A'}</span>
        </div>
        <span className="status">{booking?.bookingStatus || 'UNKNOWN'}</span>
      </div>
      <div className="card-body">
        <p><strong>Bus Name:</strong> {booking?.busName || booking?.operator || 'SRS Travels'}</p>
        <p><strong>Passenger Name:</strong> {booking?.passengerName || 'N/A'}</p>
        <p><strong>Travel Date:</strong> {booking?.travelDate ? travelDate : 'N/A'}</p>
        <p><strong>Seats:</strong> {booking?.seatNumbers || 'N/A'}</p>
        <p><strong>Total Fare:</strong> ₹{booking?.totalAmount || '0.00'}</p>
      </div>
      <div className="card-footer">
        {/* This logic ensures the button only shows for 'CONFIRMED' tickets */}
        {booking?.bookingStatus === 'CONFIRMED' && (
          <button onClick={() => onCancel(booking.id)} className="cancel-btn">
            Cancel Ticket
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;