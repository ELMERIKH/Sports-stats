import React, { useState ,useEffect} from 'react';
import axios from 'axios';

const TeamInfo = () => {
  const [teamName, setTeamName] = useState('');
  const [teamData, setTeamData] = useState(null);
  const [teamStatistics, setTeamStatistics] = useState([]);
  const [lID, setLeagueID] = useState('');
  const [season, setSeason] = useState('2022'); // Default season value
  const seasons = Array.from({ length: 23 }, (_, index) => 2001 + index); // Generate an array of seasons from 2001 to 2023
  const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);
   
    const handleSeasonChange = (e) => {
      setSeason(e.target.value);
    };
  const handleSearch = async (event) => {
    event.preventDefault();

    if (teamName === '' || teamName === null) {
      setTeamData(null); // Clear the previous teamData
      setTeamStatistics([]);
      // Clear the previous teamStatistics
      return null;
    }

    try {
      const response = await axios.get(`https://v3.football.api-sports.io/teams?name=${teamName}`, {
        headers: {
          'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
        }
      });
      if (response.data.response.length === 0) {
        setError(true);
        setTeamData(null); // Clear the previous teamData
        setTeamStatistics([]);
        // Clear the previous teamStatistics
      } else {
        setTeamData(response.data.response[0]);
        setError(false);
        // Fetch team statistics
        const teamId = response.data.response[0]?.team?.id;
        console.log(teamId)
        const leagueResponse = await fetch(`https://v3.football.api-sports.io/leagues?team=${teamId}`, {
          
          headers: {
            'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
          }
        });
        const leagueData = await leagueResponse.json();        
        
        setLeagueID(leagueData.response[0].league.id);
        console.log(lID)
        
       

        const statisticsResponse = await axios.get(`https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${teamId}&league=${leagueData.response[0].league.id}`, {
          headers: {
            'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
          }
        });
       const res=statisticsResponse.data
        setTeamStatistics(res.response);
        console.log(res.response)
        console.log(res.response.league)
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
      setTeamData(null); // Clear the previous teamData
      setTeamStatistics([]);
      // Clear the previous teamStatistics
    }finally {
      
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
        <div style={{ background: '#0b0949', border: '2px solid #08007c ', padding: '10px' ,display: 'flex', flexDirection: 'row'  }}>
          <td><h2 style={{ color: 'gold' }}>Team Information</h2>
          <p style={{ color: 'white' }}>Team Name: {teamData.team.name}</p>
          <p style={{ color: 'white' }}>Country: {teamData.team.country}</p>
          <p style={{ color: 'white' }}>Founded: {teamData.team.founded}</p>
          <img src={teamData.team.logo} alt="Team Logo" style={{ width: '200px', height: '200px' }} />
          </td>
          <tr>
          <ul>
            <h3 style={{ color: 'gold' }}>Venue Information</h3>
            <p style={{ color: 'white' }}>Venue Name: {teamData.venue.name}</p>
            <p style={{ color: 'white' }}>Address: {teamData.venue.address}</p>
            <p style={{ color: 'white' }}>City: {teamData.venue.city}</p>
            <p style={{ color: 'white' }}>Capacity: {teamData.venue.capacity}</p>
            <img src={teamData.venue.image} alt="Venue Image" style={{ width: '200px', height: '150px' }} />
          </ul>
          </tr>
         
          <ul></ul><ul></ul>
 {!loading ? (
        <p>Loading statistics...</p>
      ) : teamStatistics  ? (
        <div>
   
        <h3 style={{ color: 'gold' }}>Team Statistics</h3>
  <label htmlFor="season" style={{ color: 'white' }}>Season:</label>
  <select
      id="season"
      value={season}
      onChange={handleSeasonChange}
      style={{ marginLeft: '10px' }}
    >
      {seasons.map((year) => (
        <option key={year} value={year}>{year}</option>
      ))}
    </select>
    <table>
      <thead>
        <tr>
          <th style={{ color: 'blue' }}>Statistic</th>
          <th style={{ color: 'blue' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ color: 'white' }}>League</td>
          <td style={{ color: 'white' }}>{teamStatistics.league.name}</td>
        </tr>
        <tr>
          <td style={{ color: 'white' }}>Season</td>
      

          <td style={{ color: 'white' }}>{teamStatistics.league.season}</td>
        </tr>
        <tr>
          <td style={{ color: 'white' }}>Played</td>
          <td style={{ color: 'white' }}>{teamStatistics.fixtures.played.total}</td>
        </tr>
        <tr>
          <td style={{ color: 'white' }}>Wins</td>
          <td style={{ color: 'white' }}>{teamStatistics.fixtures.wins.total}</td>
        </tr>
        <tr>
          <td style={{ color: 'white' }}>Draws</td>
          <td style={{ color: 'white' }}>{teamStatistics.fixtures.draws.total}</td>
        </tr>
        <tr>
          <td style={{ color: 'white' }}>Losses</td>
          <td style={{ color: 'white' }}>{teamStatistics.fixtures.loses.total}</td>
        </tr>
       <tr>

       <td style={{ color: 'white' }}>Failed to Score (Home)</td>
<td style={{ color: 'white' }}>{teamStatistics.failed_to_score.home}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Failed to Score (Away)</td>
<td style={{ color: 'white' }}>{teamStatistics.failed_to_score.away}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Failed to Score (Total)</td>
<td style={{ color: 'white' }}>{teamStatistics.failed_to_score.total}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Clean Sheets (Home)</td>
<td style={{ color: 'white' }}>{teamStatistics.clean_sheet.home}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Clean Sheets (Away)</td>
<td style={{ color: 'white' }}>{teamStatistics.clean_sheet.away}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Clean Sheets (Total)</td>
<td style={{ color: 'white' }}>{teamStatistics.clean_sheet.total}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Penalty Scored</td>
<td style={{ color: 'white' }}>{teamStatistics.penalty.scored.total}</td>
</tr>
<tr>
<td style={{ color: 'white' }}>Penalty Missed</td>
<td style={{ color: 'white' }}>{teamStatistics.penalty.missed.total}</td>
</tr>

      </tbody>
    </table>
  </div>) : (
        <p>No statistics available</p>
      )}
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

