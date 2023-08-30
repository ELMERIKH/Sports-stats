import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bhighlights = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');
  const [videoId, setVideoId] = useState('');
  const [selectedYear, setSelectedYear] = useState('2023'); // Default year
  const [selectedMonth, setSelectedMonth] = useState('01'); // Default month
  const [selectedDay, setSelectedDay] = useState('01'); // Default day
  const yearOptions = Array.from({ length: 4 }, (_, index) => (2020 + index).toString());
  const monthOptions = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));
  const dayOptions = Array.from({ length: 32 }, (_, index) => (index + 1).toString().padStart(2, '0'))
                        .filter((_, index) => index % 7 === 0); // Get every 7th day

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://v2.nba.api-sports.io/games', {
          params: {
            date:`${selectedYear}-${selectedMonth}-${selectedDay}`,// Adjust the date as needed
          },
          headers: {
            'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
          },
        });
        setMatches(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, [selectedYear, selectedDay]);

  const handleMatchClick = async (match) => {
    setSelectedMatch(match); // Set the selected match object
    const homeTeamFullName = match.teams.home.name;
    const visitorTeamFullName = match.teams.visitors.name;
    const season = match.season.toString();
    const searchQuery = `${homeTeamFullName} ${visitorTeamFullName} ${season} NBA highlights`;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            key: 'AIzaSyAriph1SG1qMzJm6iWrjo3dbzFZeZVr-0I', // Replace with your actual API key
            q: searchQuery,
            part: 'snippet',
            maxResults: 1,
          },
        }
      );

      const firstVideoId = response.data.items[0].id.videoId;
      setVideoId(firstVideoId); // Set the videoId to trigger iframe rendering
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <h1>Latest NBA Matches</h1>
    <div className="date-select">
  <div className="dropdown">
    <select
      className="dropdown-select"
      value={selectedYear}
      onChange={(event) => setSelectedYear(event.target.value)}
    >
      {yearOptions.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </div>
  <div className="dropdown">
    <select
      className="dropdown-select"
      value={selectedMonth}
      onChange={(event) => setSelectedMonth(event.target.value)}
    >
      {monthOptions.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </div>
  <div className="dropdown">
    <select
      className="dropdown-select"
      value={selectedDay}
      onChange={(event) => setSelectedDay(event.target.value)}
    >
      {dayOptions.map((day) => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  </div>
</div>
    <div className="match-list">
      {matches.map((match) => (
        <div key={match.id}>
          <div
            className={`match ${selectedMatch === match ? 'selected' : ''}`}
            onClick={() => handleMatchClick(match)}
          >
            <span className="match-name">
              {match.teams.home.name} vs {match.teams.visitors.name}
            </span>
            <span className="season">{`Season ${match.season}`}</span>
          </div>
          {selectedMatch === match && videoId && (
            <div id="video-container">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="NBA Highlight Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>

  );
};

export default Bhighlights;
