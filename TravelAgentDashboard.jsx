import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './PageStyles.css';

const TravelAgentDashboard = () => {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [cancellations, setCancellations] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const storedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const storedCancellations = JSON.parse(localStorage.getItem('cancellations')) || [];
    
    setBookings(storedBookings);
    setSchedules(storedSchedules);
    setCancellations(storedCancellations);
  }, []);

  const agentBookings = bookings.filter(booking => booking.agentId === currentUser?.id);
  const totalSales = agentBookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  const commission = totalSales * 0.15;
  const availableTravels = schedules.filter(schedule => schedule.seatsLeft > 0).length;
  const agentCancellations = cancellations.filter(cancel => cancel.agentId === currentUser?.id);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Travel Agent Dashboard</h1>
        <p>Welcome {currentUser?.name} - Manage customer bookings and travel services</p>
        <div className="access-notice">
          <small>ℹ️ Note: Travel agents cannot book tickets. Only passengers have booking access.</small>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>My Bookings</h3>
          <p className="dashboard-number">{agentBookings.length}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Sales</h3>
          <p className="dashboard-number">₹{totalSales.toLocaleString()}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Available Travels</h3>
          <p className="dashboard-number">{availableTravels}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Cancellations</h3>
          <p className="dashboard-number">{agentCancellations.length}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Commission Earned</h3>
          <p className="dashboard-number">₹{commission.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="admin-sections">
        <div className="admin-section">
          <h3>Booking Details</h3>
          <div className="data-table">
            <div className="table-header">
              <span>Passenger</span>
              <span>PNR</span>
              <span>Route</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {agentBookings.slice(-8).reverse().map((booking, index) => (
              <div key={booking.id || index} className="data-row">
                <span>{booking.passengerName || 'N/A'}</span>
                <span>{booking.pnrNumber || 'N/A'}</span>
                <span>{`${booking.origin || 'N/A'} → ${booking.destination || 'N/A'}`}</span>
                <span>₹{booking.totalAmount || 0}</span>
                <span className="status-badge">{booking.status || 'CONFIRMED'}</span>
              </div>
            ))}
            {agentBookings.length === 0 && (
              <div className="no-data">No bookings made yet</div>
            )}
          </div>
        </div>
        
        <div className="admin-section">
          <h3>Cancellation Details</h3>
          <div className="data-table">
            <div className="table-header">
              <span>PNR</span>
              <span>Passenger</span>
              <span>Refund</span>
              <span>Date</span>
            </div>
            {agentCancellations.slice(-6).reverse().map((cancel, index) => (
              <div key={cancel.id || index} className="data-row">
                <span>{cancel.pnrNumber || 'N/A'}</span>
                <span>{cancel.passengerName || 'N/A'}</span>
                <span>₹{cancel.refundAmount || 0}</span>
                <span>{cancel.cancelDate || new Date().toLocaleDateString()}</span>
              </div>
            ))}
            {agentCancellations.length === 0 && (
              <div className="no-data">No cancellations yet</div>
            )}
          </div>
        </div>
        
        <div className="admin-section">
          <h3>Available Travel Details</h3>
          <div className="data-table">
            <div className="table-header">
              <span>Route</span>
              <span>Operator</span>
              <span>Time</span>
              <span>Price</span>
              <span>Seats Left</span>
            </div>
            {schedules.filter(s => s.seatsLeft > 0).slice(0, 8).map(schedule => (
              <div key={schedule.id} className="data-row">
                <span>{`${schedule.origin} → ${schedule.destination}`}</span>
                <span>{schedule.operator}</span>
                <span>{schedule.departureTime}</span>
                <span>₹{schedule.price}</span>
                <span className="seats-badge">{schedule.seatsLeft}</span>
              </div>
            ))}
            {availableTravels === 0 && (
              <div className="no-data">No available travels</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelAgentDashboard;