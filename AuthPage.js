// src/pages/AuthPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import authService from '../services/authService';
import './AuthPage.css'; // Make sure you have this CSS file

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('PASSENGER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    
    // Get stored user data from registration or use default
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = storedUsers.find(u => u.email === email);
    
    const mockUser = {
      id: 1,
      name: registeredUser?.name || name || email.split('@')[0],
      email: email,
      role: registeredUser?.role || 'PASSENGER'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'demo-token-123');
    
    // Navigate based on role - non-passengers go directly to dashboard
    const userRole = mockUser.role;
    if (userRole === 'ADMIN') {
      navigate('/admin');
    } else if (userRole === 'TRAVEL_AGENT') {
      navigate('/travel-agent');
    } else if (userRole === 'DRIVER') {
      navigate('/driver');
    } else if (userRole === 'FLEET_MANAGER') {
      navigate('/fleet-manager');
    } else if (userRole === 'BUS_OPERATOR') {
      navigate('/bus-operator');
    } else {
      navigate('/'); // Only passengers go to home
    }
    
    window.location.reload();
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate name contains at least one capital letter
    if (!/[A-Z]/.test(name)) {
      setError('Name must contain at least one capital letter');
      return;
    }
    
    // Validate password is 6 or more characters
    if (password.length < 6) {
      setError('Password must be 6 or more characters');
      return;
    }
    
    // Store user data locally
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const newUser = { name, email, password, role };
    storedUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    
    setIsLoginView(true);
    setName('');
    setEmail('');
    setPassword('');
    alert('Registration successful! Please sign in.');
  };

 
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{isLoginView ? '🚌 Sign In' : '🎆 Create Account'}</h2>
        <p className="auth-subtitle">
          {isLoginView ? 'Welcome back! Please sign in to continue.' : 'Join thousands of happy travelers today!'}
        </p>
        
        {error && <div className="error-message">{error}</div>}
        
        {isLoginView ? (
          <form onSubmit={handleSignIn} className="auth-form">
            <div className="form-group">
              <span className="input-icon">📧</span>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="input-with-icon"
                required 
              />
            </div>
            <div className="form-group">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="input-with-icon"
                required 
              />
            </div>
            <button type="submit" className="auth-btn">
              Sign In to BusBooker
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <span className="input-icon">👤</span>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className="input-with-icon"
                required 
              />
            </div>
            <div className="form-group">
              <span className="input-icon">📧</span>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="input-with-icon"
                required 
              />
            </div>
            <div className="form-group">
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                placeholder="Create Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className="input-with-icon"
                required 
              />
            </div>
            <div className="form-group role-selector">
              <select value={role} onChange={(e) => setRole(e.target.value)} required>
                <option value="PASSENGER">👥 Passenger</option>
                <option value="TRAVEL_AGENT">🏢 Travel Agent</option>
                <option value="DRIVER">🚌 Driver</option>
                <option value="FLEET_MANAGER">🚚 Fleet Manager</option>
                <option value="BUS_OPERATOR">🏢 Bus Operator</option>
                <option value="ADMIN">🔧 Admin</option>
              </select>
            </div>
            <button type="submit" className="auth-btn">
              Create Account
            </button>
          </form>
        )}
        
        <p className="toggle-text" onClick={() => setIsLoginView(!isLoginView)}>
          {isLoginView ? "🆕 Don't have an account? Create one now!" : '⬅️ Already have an account? Sign in here!'}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;