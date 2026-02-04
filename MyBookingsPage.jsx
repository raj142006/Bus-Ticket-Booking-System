// src/pages/MyBookingsPage.jsx

import React, { useState, useEffect, useMemo } from 'react'; // 1. Import useMemo
import ticketService from '../services/ticketService';
import BookingCard from '../components/BookingCard';
import './MyBookingsPage.css';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 2. Add state for sorting and pagination
  const [sortConfig, setSortConfig] = useState({ key: 'travelDate', direction: 'descending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Show 5 bookings per page

  useEffect(() => {
    ticketService.getUserBookings()
      .then(response => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch your bookings. Please try again later.');
        setLoading(false);
      });
  }, []);

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      ticketService.cancelTicket(bookingId)
        .then(() => {
          setBookings(currentBookings => 
            currentBookings.map(booking => 
              booking.id === bookingId 
                ? { ...booking, bookingStatus: 'CANCELLED' } 
                : booking
            )
          );
          alert('Booking cancelled successfully. Seats have been released.');
        })
        .catch((err) => {
          console.error(err);
          alert('Failed to cancel booking.');
        });
    }
  };

  // 3. Apply sorting and pagination logic
  const processedBookings = useMemo(() => {
    let sortableBookings = [...bookings];
    sortableBookings.sort((a, b) => {
      // Special handling for date sorting
      if (sortConfig.key === 'travelDate') {
        const dateA = new Date(a.travelDate);
        const dateB = new Date(b.travelDate);
        if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      }
      // Standard sorting for other keys
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return sortableBookings.slice(indexOfFirstItem, indexOfLastItem);
  }, [bookings, currentPage, sortConfig]);


  if (loading) return <div className="loader">Loading your bookings...</div>;
  if (error) return <div className="error">[Error - You need to specify the message]</div>;

  return (
    <div className="my-bookings-container">
      <h1>My Bookings</h1>

      {bookings.length > 0 ? (
        <>
          {/* 4. Add UI Controls for Sorting */}
          <div className="controls-container">
            <label>Sort By: </label>
            <select
              onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
              value={sortConfig.key}
            >
              <option value="travelDate">Travel Date</option>
              <option value="totalAmount">Price</option>
              <option value="bookingStatus">Status</option>
            </select>
            <button onClick={() => setSortConfig({ ...sortConfig, direction: 'ascending' })}>Asc</button>
            <button onClick={() => setSortConfig({ ...sortConfig, direction: 'descending' })}>Desc</button>
          </div>

          {/* 5. Map over the processed (sorted and paginated) list */}
          {processedBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={handleCancelBooking} 
            />
          ))}

          {/* 6. Add UI Controls for Pagination */}
          <div className="pagination-controls">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>Page {currentPage} of {Math.ceil(bookings.length / itemsPerPage)}</span>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage * itemsPerPage >= bookings.length}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p>You have no bookings yet.</p>
      )}
    </div>
  );
};

export default MyBookingsPage;