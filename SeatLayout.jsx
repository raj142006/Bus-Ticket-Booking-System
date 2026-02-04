// src/components/SeatLayout.jsx

import React, { useState, useEffect } from 'react';
import './SeatLayout.css'; // We will create this CSS file next

const SeatLayout = ({ bookedSeats = "", onSeatSelect, pricePerSeat }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  
  // Parse bookedSeats string into array
  const bookedSeatsArray = typeof bookedSeats === 'string' 
    ? bookedSeats.split(',').map(s => s.trim()).filter(s => s) 
    : Array.isArray(bookedSeats) ? bookedSeats : [];

  // Reset selected seats when booked seats change
  useEffect(() => {
    setSelectedSeats([]);
  }, [bookedSeats]);
  
  // This effect ensures the parent component is notified of changes
  useEffect(() => {
    onSeatSelect(selectedSeats, selectedSeats.length * pricePerSeat);
  }, [selectedSeats, onSeatSelect, pricePerSeat]);

  const handleSeatClick = (seatNumber) => {
    if (bookedSeatsArray.includes(seatNumber)) {
      return; // Can't select a booked seat
    }

    // Toggle selection
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const totalRows = 10;
    const seatsPerRow = 4;
    const seats = [];

    for (let i = 0; i < totalRows; i++) {
      const rowSeats = [];
      for (let j = 1; j <= seatsPerRow; j++) {
        const seatNumber = `${String.fromCharCode(65 + i)}${j}`;
        let seatClass = 'seat';

        if (bookedSeatsArray.includes(seatNumber)) {
          seatClass += ' booked';
        } else if (selectedSeats.includes(seatNumber)) {
          seatClass += ' selected';
        } else {
          seatClass += ' available';
        }

        // Add a gap for the aisle
        if (j === seatsPerRow / 2) {
          rowSeats.push(<div key="aisle" className="aisle"></div>);
        }

        rowSeats.push(
          <div key={seatNumber} className={seatClass} onClick={() => handleSeatClick(seatNumber)}>
            {seatNumber}
          </div>
        );
      }
      seats.push(<div key={i} className="seat-row">{rowSeats}</div>);
    }
    return seats;
  };

  return (
    <div className="seat-selection-container">
      <div className="seat-map">{renderSeats()}</div>
      <div className="seat-legend">
        <div className="legend-item"><div className="seat available"></div>Available</div>
        <div className="legend-item"><div className="seat selected"></div>Selected</div>
        <div className="legend-item"><div className="seat booked"></div>Booked</div>
      </div>
    </div>
  );
};

export default SeatLayout;