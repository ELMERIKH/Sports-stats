// SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ handleTeamSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleTeamSearch(searchTerm);
    setSearchTerm('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
      <input
        type="text"
        placeholder="Search for a team..."
        value={searchTerm}
        onChange={handleChange}
        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '10px',
          padding: '10px 20px',
          borderRadius: '5px',
          background: 'blue',
          color: 'white',
          border: 'none',
          animation: 'flashy 1s infinite',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;