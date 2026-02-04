// src/pages/FleetManagerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './PageStyles.css';

const FleetManagerDashboard = () => {
  const { currentUser } = useAuth();
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    loadFleetData();
  }, []);

  const loadFleetData = () => {
    // Mock fleet data
    const mockVehicles = [
      { id: 1, regNumber: 'TN-01-AB-1234', make: 'Tata', model: 'Ultra', capacity: 45, status: 'Active', lastMaintenance: '2024-01-15' },
      { id: 2, regNumber: 'TN-02-CD-5678', make: 'Ashok Leyland', model: 'Viking', capacity: 52, status: 'Maintenance', lastMaintenance: '2024-01-10' },
      { id: 3, regNumber: 'TN-03-EF-9012', make: 'Volvo', model: 'B11R', capacity: 49, status: 'Active', lastMaintenance: '2024-01-20' }
    ];

    const mockDrivers = [
      { id: 1, name: 'Rajesh Kumar', license: 'DL123456789', experience: '8 years', status: 'Available', assignedVehicle: 'TN-01-AB-1234' },
      { id: 2, name: 'Suresh Patel', license: 'DL987654321', experience: '12 years', status: 'On Trip', assignedVehicle: 'TN-02-CD-5678' },
      { id: 3, name: 'Amit Singh', license: 'DL456789123', experience: '5 years', status: 'Available', assignedVehicle: 'TN-03-EF-9012' }
    ];

    const mockMaintenance = [
      { id: 1, vehicleId: 2, type: 'Engine Service', scheduledDate: '2024-01-25', status: 'Pending', cost: 15000 },
      { id: 2, vehicleId: 1, type: 'Tire Replacement', scheduledDate: '2024-02-01', status: 'Scheduled', cost: 25000 },
      { id: 3, vehicleId: 3, type: 'AC Service', scheduledDate: '2024-02-05', status: 'Completed', cost: 8000 }
    ];

    setVehicles(mockVehicles);
    setDrivers(mockDrivers);
    setMaintenance(mockMaintenance);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚛 Fleet Manager Dashboard</h1>
        <p>Welcome, {currentUser?.name}! Manage your fleet operations efficiently.</p>
        <div className="access-notice">
          <small>ℹ️ Note: Fleet managers cannot book tickets. Only passengers have booking access.</small>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Vehicles</h3>
          <div className="dashboard-number">{vehicles.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Active Vehicles</h3>
          <div className="dashboard-number">{vehicles.filter(v => v.status === 'Active').length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Total Drivers</h3>
          <div className="dashboard-number">{drivers.length}</div>
        </div>
        <div className="dashboard-card">
          <h3>Available Drivers</h3>
          <div className="dashboard-number">{drivers.filter(d => d.status === 'Available').length}</div>
        </div>
      </div>

      <div className="admin-sections">
        <div className="admin-section">
          <h3>🚌 Vehicle Fleet</h3>
          <div className="data-table">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="data-row">
                <div>
                  <strong>{vehicle.regNumber}</strong>
                  <br />
                  <small>{vehicle.make} {vehicle.model}</small>
                </div>
                <div>
                  Capacity: {vehicle.capacity} seats
                  <br />
                  <small>Last Service: {vehicle.lastMaintenance}</small>
                </div>
                <div>
                  <span className={`status-badge ${vehicle.status === 'Active' ? '' : 'maintenance'}`}>
                    {vehicle.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-section">
          <h3>👨‍✈️ Driver Management</h3>
          <div className="data-table">
            {drivers.map(driver => (
              <div key={driver.id} className="data-row">
                <div>
                  <strong>{driver.name}</strong>
                  <br />
                  <small>License: {driver.license}</small>
                </div>
                <div>
                  Experience: {driver.experience}
                  <br />
                  <small>Vehicle: {driver.assignedVehicle}</small>
                </div>
                <div>
                  <span className={`role-badge ${driver.status === 'Available' ? '' : 'busy'}`}>
                    {driver.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="admin-section">
        <h3>🔧 Maintenance Schedule</h3>
        <div className="data-table">
          {maintenance.map(item => (
            <div key={item.id} className="data-row">
              <div>
                <strong>{item.type}</strong>
                <br />
                <small>Vehicle ID: {item.vehicleId}</small>
              </div>
              <div>
                Scheduled: {item.scheduledDate}
                <br />
                <small>Cost: ₹{item.cost.toLocaleString()}</small>
              </div>
              <div>
                <span className={`status-badge ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FleetManagerDashboard;