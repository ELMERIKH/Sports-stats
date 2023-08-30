import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bhighlights = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState('');

  useEffect(() => {
    // Fetch the latest NBA matches
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://www.balldontlie.io/api/v1/games');
        setMatches(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);
  const extractVideoId = (html) => {
    const regex = /"videoId":"([^"]+)"/;
    const match = html.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };
  const handleMatchChange = (event) => {
    setSelectedMatch(event.target.value);
  };

  const searchVideos = async () => {
    const selectedMatchData = matches.find((match) => {
      const homeTeamFullName = match.home_team.full_name;
      const visitorTeamFullName = match.visitor_team.full_name;
      const season = match.season.toString();
      return (
        homeTeamFullName === selectedMatch ||
        visitorTeamFullName === selectedMatch ||
        `${homeTeamFullName} ${visitorTeamFullName} ${season}` === selectedMatch
      );
    });
  
    if (selectedMatchData) {
      const homeTeamFullName = selectedMatchData.home_team.full_name;
      const visitorTeamFullName = selectedMatchData.visitor_team.full_name;
      const season = selectedMatchData.season.toString();
      const searchQuery = `${homeTeamFullName} ${visitorTeamFullName} ${season}`;
  
      try {
        const response = await axios.get(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`);
        const videoId = extractVideoId(response.data);
        const iframeUrl = `https://www.youtube.com/embed/${videoId}`;
  
        // Create an iframe element dynamically
        const iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        iframe.width = '560';
        iframe.height = '315';
        iframe.frameBorder = '0';
        iframe.allowFullScreen = true;
  
        // Replace the existing content with the iframe
        const container = document.getElementById('video-container');
        container.innerHTML = '';
        container.appendChild(iframe);
      } catch (error) {
        console.error(error);
      }
    }
  
  
  };

  return (
    <div>
      <h1>Latest NBA Matches</h1>
      <select value={selectedMatch} onChange={handleMatchChange}>
        <option value="">Select a match</option>
        {matches.map((match) => (
          <option key={match.id} value={match.home_team.full_name}>
            {match.home_team.full_name} vs {match.visitor_team.full_name} - Season {match.season}
          </option>
        ))}
      </select>
      <button onClick={searchVideos}>Search Videos</button>
    </div>
  );
};

export default Bhighlights;