import React, { useEffect, useState } from 'react';

const TeamInfo = () => {
  const [teamData, setTeamData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.example.com/team')
      .then((response) => response.json())
      .then((data) => setTeamData(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="team-info">
      <h2>Team Information</h2>
          {teamData ? (
        <div>
          <p>Team Name: {teamData.name}</p>
          <p>Location: {teamData.location}</p>
          {/* Add more data fields as needed */}
        </div>
      ) : (
        <p>Loading team information...</p>
        
      )}
  
  
    </div>
  );
};

export default TeamInfo;