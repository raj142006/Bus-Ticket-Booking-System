import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './TicketList.css';

const SkeletonCard = () => (
  <div className="ticket-card skeleton-card">
    <div className="skeleton skeleton-header"></div>
    <div className="skeleton skeleton-route"></div>
    <div className="skeleton skeleton-details"></div>
    <div className="skeleton skeleton-footer"></div>
  </div>
);

const TicketList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from');
  const to = queryParams.get('to');
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Sorting and pagination state
  const [sortConfig, setSortConfig] = useState({ key: 'price', direction: 'ascending' });
  const [currentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const searchBuses = async () => {
      if (!from || !to) return;

      console.log(`Searching for buses from ${from} to ${to}...`);
      setLoading(true);

      try {
        const { searchBuses } = await import('../services/busService');
        const results = await searchBuses(from, to);
        setBuses(results || []);
      } catch (error) {
        console.error('Error searching buses:', error);
        setBuses([]);
      } finally {
        setTimeout(() => setLoading(false), 800); // Smooth transition
      }
    };

    searchBuses();
  }, [from, to]);

  // Toggle favorite
  const toggleFavorite = (busId) => {
    setFavorites(prev =>
      prev.includes(busId)
        ? prev.filter(id => id !== busId)
        : [...prev, busId]
    );
  };

  // Process buses with sorting
  const processedBuses = useMemo(() => {
    let sortableBuses = [...buses];
    sortableBuses.sort((a, b) => {
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
    return sortableBuses.slice(indexOfFirstItem, indexOfLastItem);
  }, [buses, currentPage, sortConfig]);

  if (loading) {
    return (
      <div className="ticket-list-container">
        <div className="page-header fade-in">
          <h1>🚌 Available Buses</h1>
          <p>Searching for routes from <strong>{from}</strong> to <strong>{to}</strong></p>
        </div>
        <div className="filters-section glass fade-in">
          <div className="skeleton skeleton-filter"></div>
        </div>
        <div className="tickets-grid">
          {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="ticket-list-container">
      <div className="page-header fade-in">
        <h1>🚌 Available Buses</h1>
        <p>From <strong>{from}</strong> to <strong>{to}</strong></p>
        <div className="results-count">{buses.length} buses found</div>
      </div>

      <div className="filters-section glass">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Sort By</label>
            <select
              onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
              value={sortConfig.key}
            >
              <option value="price">💰 Price</option>
              <option value="departureTime">🕐 Departure</option>
              <option value="rating">⭐ Rating</option>
              <option value="duration">⏱️ Duration</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Order</label>
            <select
              onChange={(e) => setSortConfig({ ...sortConfig, direction: e.target.value })}
              value={sortConfig.direction}
            >
              <option value="ascending">Low to High</option>
              <option value="descending">High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="tickets-grid stagger-fade-in">
        {processedBuses.length > 0 ? (
          processedBuses.map((bus, index) => (
            <div
              key={bus.id}
              className="ticket-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                className={`favorite-btn ${favorites.includes(bus.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(bus.id)}
                aria-label="Add to favorites"
              >
                {favorites.includes(bus.id) ? '❤️' : '🤍'}
              </button>

              <div className="ticket-header">
                <div className="operator-info">
                  <div className="operator-name">{bus.operator}</div>
                  <div className="bus-type">{bus.type}</div>
                </div>
                <div className="rating-badge glow">
                  <span>⭐</span>
                  <span>{bus.rating}</span>
                </div>
              </div>

              <div className="route-info">
                <div className="route-point">
                  <div className="route-time">{bus.departureTime}</div>
                  <div className="route-city">{bus.origin}</div>
                </div>
                <div className="route-arrow">
                  <div className="animated-arrow">→</div>
                  <div className="route-duration">{bus.duration}</div>
                </div>
                <div className="route-point">
                  <div className="route-time">{bus.arrivalTime}</div>
                  <div className="route-city">{bus.destination}</div>
                </div>
              </div>

              <div className="ticket-details">
                <div className="detail-item">
                  <div className="detail-icon">⏱️</div>
                  <div>
                    <div className="detail-label">Duration</div>
                    <div className="detail-value">{bus.duration}</div>
                  </div>
                </div>
                <div className="detail-item">
                  <div className="detail-icon">💺</div>
                  <div>
                    <div className="detail-label">Seats Left</div>
                    <div className={`detail-value ${bus.seatsLeft < 10 ? 'urgent pulse' : ''}`}>
                      {bus.seatsLeft}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ticket-footer">
                <div className="price-info">
                  <div className="price">₹{bus.price}</div>
                  <div className="seats-left">
                    {bus.seatsLeft < 10 && '🔥 '}
                    {bus.seatsLeft} seats left
                  </div>
                </div>
                <Link to={`/book/${bus.id}`}>
                  <button className="book-btn ripple">
                    Select Seats
                    <span className="btn-arrow">→</span>
                  </button>
                </Link>
              </div>

              {bus.seatsLeft < 10 && (
                <div className="urgent-badge">Filling Fast!</div>
              )}
            </div>
          ))
        ) : (
          <div className="no-tickets scale-up">
            <div className="no-tickets-icon">😊</div>
            <h3>No buses found for this route</h3>
            <p>Try searching for: Coimbatore, Chennai, Bangalore, Mumbai, Delhi, Hyderabad, Pune, Kolkata</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;