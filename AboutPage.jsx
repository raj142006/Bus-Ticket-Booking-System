// src/pages/AboutPage.jsx
import React from 'react';
import './PageStyles.css';

const AboutPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🚌 About BusBooker</h1>
        <p>India's Most Trusted Online Bus Booking Platform</p>
      </div>

      <div className="about-hero">
        <div className="hero-content">
          <h2>Connecting India, One Journey at a Time</h2>
          <p>Since 2010, BusBooker has been revolutionizing bus travel across India with our cutting-edge technology platform, making bus booking simple, safe, and reliable for millions of travelers.</p>
        </div>
      </div>

      <div className="about-stats">
        <div className="stat-card">
          <div className="stat-number">50M+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">3,500+</div>
          <div className="stat-label">Bus Operators</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100K+</div>
          <div className="stat-label">Routes Covered</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15+</div>
          <div className="stat-label">Years Experience</div>
        </div>
      </div>

      <div className="about-sections">
        <div className="about-section">
          <h3>🎯 Our Mission</h3>
          <p>To make bus travel accessible, comfortable, and reliable for every Indian by leveraging technology and building strong partnerships with bus operators across the country.</p>
        </div>

        <div className="about-section">
          <h3>👁️ Our Vision</h3>
          <p>To become India's most preferred and trusted platform for intercity bus travel, connecting every corner of the country with safe, affordable, and convenient transportation options.</p>
        </div>

        <div className="about-section">
          <h3>💎 Our Values</h3>
          <ul>
            <li><strong>Customer First:</strong> Every decision we make prioritizes customer satisfaction and experience</li>
            <li><strong>Trust & Safety:</strong> We ensure secure transactions and safe travel experiences</li>
            <li><strong>Innovation:</strong> Continuously improving our platform with latest technology</li>
            <li><strong>Reliability:</strong> Dependable service that customers can count on</li>
            <li><strong>Transparency:</strong> Clear pricing with no hidden charges</li>
          </ul>
        </div>
      </div>

      <div className="services-section">
        <h2>🌟 Why Choose BusBooker?</h2>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🌐</div>
            <h4>Largest Network</h4>
            <p>Access to over 100,000+ routes across India with partnerships with 3,500+ verified bus operators</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h4>Instant Booking</h4>
            <p>Book tickets in under 2 minutes with instant confirmation and e-tickets delivered to your phone</p>
          </div>
          <div className="service-card">
            <div className="service-icon">🔒</div>
            <h4>Secure Payments</h4>
            <p>100% secure payment gateway with multiple payment options including UPI, cards, and wallets</p>
          </div>
          <div className="service-card">
            <div className="service-icon">💰</div>
            <h4>Best Prices</h4>
            <p>Guaranteed lowest prices with exclusive deals, offers, and cashback on every booking</p>
          </div>
          <div className="service-card">
            <div className="service-icon">📱</div>
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer support via phone, chat, and email for hassle-free travel assistance</p>
          </div>
          <div className="service-card">
            <div className="service-icon">⭐</div>
            <h4>Quality Assurance</h4>
            <p>Verified bus operators with real customer reviews and ratings to help you make informed choices</p>
          </div>
        </div>
      </div>

      <div className="journey-section">
        <h2>📈 Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-year">2010</div>
            <div className="timeline-content">
              <h4>The Beginning</h4>
              <p>Started with a vision to digitize bus booking in India with just 50 bus operators</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2015</div>
            <div className="timeline-content">
              <h4>Rapid Expansion</h4>
              <p>Reached 1,000+ bus operators and launched mobile app with 1M+ downloads</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2020</div>
            <div className="timeline-content">
              <h4>Market Leadership</h4>
              <p>Became India's #1 bus booking platform with 25M+ customers and 2,500+ operators</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-year">2025</div>
            <div className="timeline-content">
              <h4>Innovation Leader</h4>
              <p>Serving 50M+ customers with AI-powered recommendations and 3,500+ bus operators</p>
            </div>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>👥 Leadership Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">👨‍💼</div>
            <h4>Rajesh Kumar</h4>
            <p>CEO & Founder</p>
            <span>15+ years in travel technology</span>
          </div>
          <div className="team-card">
            <div className="team-avatar">👩‍💼</div>
            <h4>Priya Sharma</h4>
            <p>CTO</p>
            <span>Expert in scalable platform architecture</span>
          </div>
          <div className="team-card">
            <div className="team-avatar">👨‍💼</div>
            <h4>Amit Patel</h4>
            <p>Head of Operations</p>
            <span>Specialist in bus operator partnerships</span>
          </div>
        </div>
      </div>

      <div className="commitment-section">
        <h2>🌱 Our Commitment</h2>
        <div className="commitment-grid">
          <div className="commitment-card">
            <h4>🌍 Environmental Responsibility</h4>
            <p>Promoting eco-friendly travel by encouraging bus transportation, reducing carbon footprint per passenger compared to private vehicles.</p>
          </div>
          <div className="commitment-card">
            <h4>🤝 Community Support</h4>
            <p>Supporting local bus operators and creating employment opportunities across India's transportation ecosystem.</p>
          </div>
          <div className="commitment-card">
            <h4>🔐 Data Security</h4>
            <p>Implementing industry-leading security measures to protect customer data and ensure safe online transactions.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;