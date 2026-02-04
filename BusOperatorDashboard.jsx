// src/pages/BusOperatorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './PageStyles.css';

const BusOperatorDashboard = () => {
  const { currentUser } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    loadOperatorData();
  }, []);

  const loadOperatorData = () => {
    const schedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const allBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Filter routes for this operator (mock data)
    const operatorRoutes = schedules.filter(schedule => 
      schedule.operator === 'KPN Travels' // Mock operator name
    );
    
    setRoutes(operatorRoutes);
    setBookings(allBookings);
    
    // Calculate revenue
    const totalRevenue = allBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
    setRevenue(totalRevenue);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🏢 Bus Operator Dashboard</h1>
        <p>Welcome, {currentUser?.name}! Manage your bus operations and routes.</p>
        <div className="access-notice">
          <small>ℹ️ Note: Bus operators cannot book tickets. Only passengers have booking access.</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Active Routes</h3>
          <div className="dashboard-number">{routes.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <div className="dashboard-number">{bookings.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Revenue</h3>
          <div className="dashboard-number">₹{revenue.toLocaleString()}</div>
        </div>
        <div className="dashboard-card">
          <h3>Occupancy Rate</h3>
          <div className="dashboard-number">78%</div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h3>🛣️ Route Management</h3>
          <div className="data-table">
            {routes.slice(0, 5).map(route => (
              <div key={route.id} className="data-row">
                <div>
                  <strong>{route.origin} → {route.destination}</strong>
                  <br />
                  <small>{route.operator}</small>
                </div>
                <div>
                  Departure: {route.departureTime}
                  <br />
                  <small>Duration: {route.duration}</small>
                </div>
                <div>
                  <span className="status-badge">
                    ₹{route.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h3>📊 Performance Metrics</h3>
          <div className="data-table">
            <div className="data-row">
              <div>
                <strong>Average Rating</strong>
                <br />
                <small>Customer satisfaction</small>
              </div>
              <div>
                4.3/5.0
                <br />
                <small>Based on 1,250 reviews</small>
              </div>
              <div>
                <span className="status-badge">Excellent</span>
              </div>
            </div>
            <div className="data-row">
              <div>
                <strong>On-Time Performance</strong>
                <br />
                <small>Schedule adherence</small>
              </div>
              <div>
                92%
                <br />
                <small>Last 30 days</small>
              </div>
              <div>
                <span className="status-badge">Good</span>
              </div>
            </div>
            <div className="data-row">
              <div>
                <strong>Fleet Utilization</strong>
                <br />
                <small>Vehicle efficiency</small>
              </div>
              <div>
                85%
                <br />
                <small>Active vehicles</small>
              </div>
              <div>
                <span className="status-badge">Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>📈 Recent Bookings</h3>
        <div className="data-table">
          {bookings.slice(0, 5).map((booking, index) => (
            <div key={index} className="data-row">
              <div>
                <strong>{booking.passengerName}</strong>
                <br />
                <small>Seat: {booking.seatNumber}</small>
              </div>
              <div>
                {booking.origin} → {booking.destination}
                <br />
                <small>{new Date(booking.bookingDate).toLocaleDateString()}</small>
              </div>
              <div>
                <span className="status-badge">
                  ₹{booking.totalAmount}
                </span>
              </div>
            </div>
          ))}
          {bookings.length === 0 && (
            <div className="no-data">
              No bookings available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BusOperatorDashboard;