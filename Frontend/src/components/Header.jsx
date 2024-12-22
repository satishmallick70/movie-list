import React, { useState } from 'react'; // Import useState from React
import { HashLink as Link } from 'react-router-hash-link';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update search term as the user types
  };

  return (
    <div className="topnav">
      <Link to="/" className="logo">Movie Maker</Link> {/* Navigate to home page */}
      <div className="nav-links">
        <Link to="/favorites">Favorites</Link> {/* Navigate to Favorites page */}
        <Link to="/add-movie">Add Movie</Link> {/* Navigate to Add Movie page */}
      </div>
      <div className="search">
        <input 
          type="text" 
          placeholder="Search" 
          name="search" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
