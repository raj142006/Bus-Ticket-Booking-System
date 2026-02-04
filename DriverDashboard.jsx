// src/pages/DriverDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const { currentUser } = useAuth();
  const [assignedSchedule, setAssignedSchedule] = useState(null);
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadDriverData();
    }
  }, [currentUser, loadDriverData]);

  const loadDriverData = React.useCallback(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const driver = users.find(user => user.id === currentUser.id);
    
    if (driver && driver.assignedScheduleId) {
      const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
      const schedule = schedules.find(s => s.id === driver.assignedScheduleId);
      setAssignedSchedule(schedule);

      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      const scheduleBookings = bookings.filter(booking => 
        booking.scheduleId === driver.assignedScheduleId
      );
      setPassengers(scheduleBookings);
    }
  }, [currentUser]);

  const getDriverInfo = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.id === currentUser.id);
  };

  const driverInfo = getDriverInfo();

  return (
    <div className="driver-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>🚌 Driver Dashboard</h1>
          <p>Welcome back, {currentUser?.name}!</p>
          <div className="access-notice">
            <small>ℹ️ Note: Drivers cannot book tickets. Only passengers have booking access.</small>
          </div>
          <div className="status-indicators">
            <div className="status-indicator status-online">
              <span>🟢</span> Online
            </div>
            {assignedSchedule && (
              <div className="status-indicator status-route">
                <span>🛣️</span> Route Assigned
              </div>
            )}
            <div className="status-indicator status-passengers">
              <span>👥</span> {passengers.length} Passengers
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="info-card">
            <h2><span className="card-icon">👨‍✈️</span>Driver Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Driver Name</strong>
                <div className="info-value">{currentUser?.name}</div>
              </div>
              <div className="info-item">
                <strong>Bus Number</strong>
                <div className="info-value">{driverInfo?.busNumber || 'Not Assigned'}</div>
              </div>
              <div className="info-item">
                <strong>Email Address</strong>
                <div className="info-value">{currentUser?.email}</div>
              </div>
            </div>
          </div>

          {assignedSchedule && (
            <div className="info-card">
              <h2><span className="card-icon">🗺️</span>Assigned Route</h2>
              <div className="route-info">
                <h3>{assignedSchedule.operator}</h3>
                <div className="route-path">
                  <span>{assignedSchedule.origin}</span>
                  <span className="route-arrow">✈️</span>
                  <span>{assignedSchedule.destination}</span>
                </div>
                <div className="route-details">
                  <div className="route-item">
                    <h4>Departure</h4>
                    <p>{assignedSchedule.departureTime}</p>
                  </div>
                  <div className="route-item">
                    <h4>Arrival</h4>
                    <p>{assignedSchedule.arrivalTime}</p>
                  </div>
                  <div className="route-item">
                    <h4>Duration</h4>
                    <p>{assignedSchedule.duration}</p>
                  </div>
                  <div className="route-item">
                    <h4>Bus Type</h4>
                    <p>{assignedSchedule.type}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="info-card">
            <h2><span className="card-icon">👥</span>Passenger Manifest</h2>
            <div className="passengers-section">
              <div className="passenger-count">
                Total Passengers: {passengers.length}
              </div>
              {passengers.length > 0 ? (
                <div className="passengers-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Passenger Name</th>
                        <th>Seat</th>
                        <th>Contact Number</th>
                        <th>Booking Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengers.map((passenger, index) => (
                        <tr key={index}>
                          <td>{passenger.passengerName}</td>
                          <td><span className="seat-number">{passenger.seatNumber}</span></td>
                          <td><span className="contact-number">{passenger.contactNumber}</span></td>
                          <td>{new Date(passenger.bookingDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-data">
                  No passengers booked for this route yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;