// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import ParticleBackground from './ParticleBackground';
import { getAvailableCities } from '../utils/cityUtils';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [availableCities, setAvailableCities] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const cities = await getAvailableCities();
        setAvailableCities(cities);
      } catch (error) {
        console.error('Error loading cities:', error);
      }
    };
    loadCities();
  }, []);

  const cities = [
    'Coimbatore', 'Chennai', 'Bangalore', 'Madurai', 'Mumbai', 'Pune',
    'Delhi', 'Hyderabad', 'Kolkata', 'Jaipur', 'Agra', 'Chandigarh',
    'Vijayawada', 'Nashik', 'Goa', 'Bhubaneswar'
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'Mumbai',
      rating: 5,
      text: 'Best bus booking experience! The interface is so smooth and booking was done in seconds.',
      avatar: '👩'
    },
    {
      name: 'Rahul Kumar',
      location: 'Bangalore',
      rating: 5,
      text: 'Amazing service! Found the perfect bus for my journey with great prices.',
      avatar: '👨'
    },
    {
      name: 'Anjali Patel',
      location: 'Delhi',
      rating: 5,
      text: 'Highly recommend! Very reliable and customer support is excellent.',
      avatar: '👩‍💼'
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    navigate(`/tickets?from=${fromCity}&to=${toCity}&date=${date}`);
  };

  // Animated counter hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }, [end, duration]);

    return count;
  };

  const customersCount = useCounter(50);
  const operatorsCount = useCounter(3500);
  const routesCount = useCounter(100000);

  return (
    <div className="home-container">
      <ParticleBackground />

      <div className="hero-section">
        <h1 className="hero-title">🚌 BusBooker</h1>
        <p className="hero-subtitle">India's Largest Online Bus Ticket Booking Platform</p>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="form-group">
              <label>From</label>
              <SearchDropdown
                placeholder="Departure City"
                value={fromCity}
                onChange={setFromCity}
                options={availableCities}
                name="from"
              />
            </div>
            <div className="form-group">
              <label>To</label>
              <SearchDropdown
                placeholder="Destination City"
                value={toCity}
                onChange={setToCity}
                options={availableCities}
                name="to"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                required
              />
            </div>
            <div className="form-group">
              <button type="submit" className="search-btn ripple">Search Buses</button>
            </div>
          </form>
        </div>
      </div>

      <div className="features-section">
        <div className="features-container">
          <h2 className="features-title">Why Choose BusBooker?</h2>
          <div className="features-grid stagger-fade-in">
            <div className="feature-card float">
              <span className="feature-icon">🌐</span>
              <h3>Largest Network</h3>
              <p>Over 100,000+ routes across India with 3,500+ bus operators</p>
            </div>
            <div className="feature-card float" style={{ animationDelay: '0.5s' }}>
              <span className="feature-icon">⚡</span>
              <h3>Instant Booking</h3>
              <p>Quick and easy booking process with instant confirmation</p>
            </div>
            <div className="feature-card float" style={{ animationDelay: '1s' }}>
              <span className="feature-icon">🔒</span>
              <h3>Secure Payment</h3>
              <p>100% secure payment gateway with multiple payment options</p>
            </div>
            <div className="feature-card float" style={{ animationDelay: '1.5s' }}>
              <span className="feature-icon">🎯</span>
              <h3>Best Prices</h3>
              <p>Guaranteed lowest prices with exclusive deals and offers</p>
            </div>
            <div className="feature-card float" style={{ animationDelay: '2s' }}>
              <span className="feature-icon">📱</span>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for hassle-free travel</p>
            </div>
            <div className="feature-card float" style={{ animationDelay: '2.5s' }}>
              <span className="feature-icon">⭐</span>
              <h3>Rated Buses</h3>
              <p>Choose from highly rated buses with verified reviews</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
              >
                <div className="testimonial-avatar">{testimonial.avatar}</div>
                <div className="testimonial-content">
                  <div className="testimonial-stars">
                    {'⭐'.repeat(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-item scale-up">
            <span className="stat-number">{customersCount}M+</span>
            <span className="stat-label">Happy Customers</span>
          </div>
          <div className="stat-item scale-up" style={{ animationDelay: '0.2s' }}>
            <span className="stat-number">{operatorsCount.toLocaleString()}+</span>
            <span className="stat-label">Bus Operators</span>
          </div>
          <div className="stat-item scale-up" style={{ animationDelay: '0.4s' }}>
            <span className="stat-number">{routesCount.toLocaleString()}+</span>
            <span className="stat-label">Routes</span>
          </div>
          <div className="stat-item scale-up" style={{ animationDelay: '0.6s' }}>
            <span className="stat-number">15+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;