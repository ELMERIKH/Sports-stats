import React, { useState } from 'react';
import axios from 'axios';

const TeamInfo = () => {
  const [teamName, setTeamName] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://v3.football.api-sports.io/teams?name=${teamName}`, {
        headers: {
          'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
        }
      });
      if (response.data.response.length === 0) {
        setError(true);
      } else {
        setTeamData(response.data.response[0]);
        setError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
        <input
          type="text"
          placeholder="Search for a team..."
          value={teamName}
          onChange={(event) => setTeamName(event.target.value)}
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
      {teamData ? (
        <div>
          <h2 style={{ color: 'gold' }}>Team Information</h2>
          <p style={{ color: 'white' }}>Team Name: {teamData.team.name}</p>
          <p style={{ color: 'white' }}>Country: {teamData.team.country}</p>
          <p style={{ color: 'white' }}>Founded: {teamData.team.founded}</p>
          <img src={teamData.team.logo} alt="Team Logo" style={{ width: '100px', height: '100px' }} />
          <h3 style={{ color: 'gold' }}>Venue Information</h3>
          <p style={{ color: 'white' }}>Venue Name: {teamData.venue.name}</p>
          <p style={{ color: 'white' }}>Address: {teamData.venue.address}</p>
          <p style={{ color: 'white' }}>City: {teamData.venue.city}</p>
          <p style={{ color: 'white' }}>Capacity: {teamData.venue.capacity}</p>
          <img src={teamData.venue.image} alt="Venue Image" style={{ width: '100px', height: '100px' }} />
        </div>
      ) : (
        error ? (
          <p style={{ color: 'red' }}>Team name invalid</p>
        ) : null
          
        
      )}
    </div>
  );
};

export default TeamInfo;