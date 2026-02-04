// src/pages/ContactPage.jsx
import React from 'react';
import './PageStyles.css';

const ContactPage = () => {
  return (
    <div className="page-container">
      <h1>Contact Us</h1>
      <p>Have questions? We'd love to hear from you. Reach out to us through any of the methods below.</p>
      
      <div className="contact-details">
        <p><strong>Email:</strong> support@mybusapp.com</p>
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Address:</strong> 123 Bus Lane, Travel Nagar, Coimbatore, Tamil Nadu, 641001</p>
      </div>

      <form className="contact-form">
        <h2>Send us a Message</h2>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="6" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;