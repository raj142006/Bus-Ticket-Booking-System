// src/components/Footer.jsx
import React from 'react';
import './Footer.css'; // We'll create this for styling

const Footer = () => {
  // Get today's date and format it
  const today = new Date();
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  return (
    <footer className="app-footer">
      <p>&copy; {today.getFullYear()} MyBusApp. All rights reserved.</p>
      <p>Date: {formattedDate}</p>
    </footer>
  );
};

export default Footer;