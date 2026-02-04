// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          BusBooker
        </Link>

        <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
          {/* Show all options only for PASSENGER or no user */}
          {!currentUser && (
            <>
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/') ? 'active-link' : ''}><span className="nav-icon">🏠</span>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/about') ? 'active-link' : ''}><span className="nav-icon">ℹ️</span>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/contact') ? 'active-link' : ''}><span className="nav-icon">📞</span>Contact</Link></li>
            </>
          )}

          {/* PASSENGER gets full access */}
          {currentUser?.role === 'PASSENGER' && (
            <>
              <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/') ? 'active-link' : ''}><span className="nav-icon">🏠</span>Home</Link></li>
              <li><Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/about') ? 'active-link' : ''}><span className="nav-icon">ℹ️</span>About</Link></li>
              <li><Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/contact') ? 'active-link' : ''}><span className="nav-icon">📞</span>Contact</Link></li>
              <li><Link to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/my-bookings') ? 'active-link' : ''}><span className="nav-icon">🎫</span>My Bookings</Link></li>
            </>
          )}

          {/* Role-specific dashboards only - no other options */}
          {currentUser?.role === 'ADMIN' && <li><Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/admin') ? 'active-link' : ''}><span className="nav-icon">🛠️</span>Admin Dashboard</Link></li>}
          {currentUser?.role === 'TRAVEL_AGENT' && <li><Link to="/travel-agent" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/travel-agent') ? 'active-link' : ''}><span className="nav-icon">🏢</span>Agent Dashboard</Link></li>}
          {currentUser?.role === 'DRIVER' && <li><Link to="/driver" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/driver') ? 'active-link' : ''}><span className="nav-icon">🚗</span>Driver Dashboard</Link></li>}
          {currentUser?.role === 'FLEET_MANAGER' && <li><Link to="/fleet-manager" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/fleet-manager') ? 'active-link' : ''}><span className="nav-icon">🚚</span>Fleet Dashboard</Link></li>}
          {currentUser?.role === 'BUS_OPERATOR' && <li><Link to="/bus-operator" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/bus-operator') ? 'active-link' : ''}><span className="nav-icon">🏢</span>Operator Dashboard</Link></li>}

          {currentUser ? (
            <>
              <li className="navbar-user"><span className="nav-icon">👤</span>{currentUser.name}</li>
              <li><button onClick={handleLogout} className="logout-btn"><span className="nav-icon">🚪</span>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className={isActive('/login') ? 'active-link' : ''}><span className="nav-icon">🔑</span>Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;