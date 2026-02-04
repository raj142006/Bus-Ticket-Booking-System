import React, { useState, useRef, useEffect } from 'react';
import './SearchDropdown.css';

const SearchDropdown = ({ placeholder, value, onChange, options, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = value === '' ? options : options.filter(option =>
    option.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-dropdown" ref={dropdownRef}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
      {isOpen && (
        <ul className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="dropdown-item"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="dropdown-item">No cities found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchDropdown;