import React, { useState, useEffect } from 'react';
import './PageStyles.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const storedSchedules = JSON.parse(localStorage.getItem('schedules')) || [];
    const storedRegisteredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    
    setUsers(storedUsers);
    setBookings(storedBookings);
    setSchedules(storedSchedules);
    setRegisteredUsers(storedRegisteredUsers);
  }, []);

  const allUsers = [...users, ...registeredUsers];
  const totalRevenue = bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
  const recentUsers = allUsers.slice(-10).reverse();
  const recentBookings = bookings.slice(-10).reverse();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage bus schedules, bookings, and system operations</p>
        <div className="access-notice">
          <small>ℹ️ Note: Admins cannot book tickets. Only passengers have booking access.</small>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <p className="dashboard-number">{allUsers.length}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <p className="dashboard-number">{bookings.length}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Active Routes</h3>
          <p className="dashboard-number">{schedules.length}</p>
        </div>
        
        <div className="dashboard-card">
          <h3>Total Revenue</h3>
          <p className="dashboard-number">₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="admin-sections">
        <div className="admin-section">
          <h3>Recent User Details</h3>
          <div className="data-table">
            <div className="table-header">
              <span>Name</span>
              <span>Email</span>
              <span>Role</span>
              <span>Joined</span>
            </div>
            {recentUsers.slice(0, 8).map((user, index) => (
              <div key={user.id || index} className="data-row">
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span className="role-badge">{user.role || 'PASSENGER'}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            ))}
            {allUsers.length === 0 && (
              <div className="no-data">No users registered yet</div>
            )}
          </div>
        </div>
        
        <div className="admin-section">
          <h3>Recent Booking Details</h3>
          <div className="data-table">
            <div className="table-header">
              <span>Passenger</span>
              <span>PNR</span>
              <span>Route</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {recentBookings.slice(0, 8).map((booking, index) => (
              <div key={booking.id || index} className="data-row">
                <span>{booking.passengerName || 'N/A'}</span>
                <span>{booking.pnrNumber || 'N/A'}</span>
                <span>{booking.route || `${booking.origin || 'N/A'} → ${booking.destination || 'N/A'}`}</span>
                <span>₹{booking.totalAmount || 0}</span>
                <span className="status-badge">{booking.status || 'CONFIRMED'}</span>
              </div>
            ))}
            {bookings.length === 0 && (
              <div className="no-data">No bookings yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;