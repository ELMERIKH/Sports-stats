import React, { useState, useEffect } from 'react';

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [error, setError] = useState(false); // Add error state
  const [team, setteam] = useState([]);
  const [teamstats, setteamstats] = useState([]);
  const [Season, setSeason] = useState('2022');
  
  const seasons = Array.from({ length: 23 }, (_, index) => 2001 + index);
  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };
  const handleSearch = async (event) => {
    event.preventDefault();

    if (teamName === '' || teamName === null) {
        setPlayers([]);
       setError(false);
      return null;
    }
    try { const response3 = await fetch(`https://v2.nba.api-sports.io/teams?search=${teamName}`, {
      method: "GET",
      headers: {
        'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
      }
    });
    const data3 = await response3.json();
      const id= data3.response
      setteam(id)
      console.log(id[0].id)
    
      const response = await fetch(`https://www.balldontlie.io/api/v1/players?search=${teamName}`);
      const data = await response.json();
      setPlayers(data.data);
      
      
      const response2 = await fetch(`https://v2.nba.api-sports.io/teams/statistics?id=${id[0].id}&season=${Season}`, {
        method: "GET",
        headers: {
          'x-apisports-key': '82bfaac93f58ea6e01674507a83f7e66'
        }
      });
      const data2 = await response2.json();
      setteamstats(data2.response);
      console.log(data2);
    } catch (error) {
      console.error('Error fetching player data:',error);
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
            background: 'gold',
            color: 'white',
            border: 'none',
            animation: 'flashy 1s infinite',
          }}
        >
          Search
        </button>
      </form>
      
        {players ? players.map(player => (
                     <div style={{ background: 'black', border: 'gold ', padding: '10px' ,display: 'flex', flexDirection: 'row'  }}>
<h1>player</h1>
      <ul>
          <li key={player.id}>
          <p style={{ color: 'gold' }}>Name:</p> <span style={{ color: 'white' }}>{player.first_name} {player.last_name}</span><br />
                <p style={{ color: 'gold' }}>Position:</p> <span style={{ color: 'white' }}>{player.position}</span><br />
                <p style={{ color: 'gold' }}>Height:</p> <span style={{ color: 'white' }}>{player.height_feet} feet {player.height_inches} inches</span><br />
                <p style={{ color: 'gold' }}>Weight:</p> <span style={{ color: 'white' }}>{player.weight_pounds} pounds</span><br />
                <p style={{ color: 'gold' }}>Team:</p> <span style={{ color: 'white' }}>{player.team.full_name}</span>
                <p style={{ color: 'gold' }}>Team:</p> <span style={{ color: 'white' }}>{player.team.name}</span><br />
<img src={player.team.logo} alt={player.team.name} style={{ width: '100px', height: '100px' }} />
              </li>
            </ul>
    </div>
    
        )): (
            error ? (
              <p style={{ color: 'red' }}>Team name invalid</p>
            ) : null
          )}  {team  ? (
            team.map((team) => (

              <div style={{ background: 'black', border: 'gold ', padding: '10px', display: 'flex', flexDirection: 'row' }}>
                <h1>team</h1>
                <ul>
                  <li key={team.id}>
                    <p style={{ color: 'gold' }}>Name:</p> <span style={{ color: 'white' }}>{team.name}</span><br />
                    <p style={{ color: 'gold' }}>Nickname:</p> <span style={{ color: 'white' }}>{team.nickname}</span><br />
                    </li>
                    </ul>
                    <ul>
                    <li key={team.id}>
                    <p style={{ color: 'gold' }}>Code:</p> <span style={{ color: 'white' }}>{team.code}</span><br />
                    <p style={{ color: 'gold' }}>City:</p> <span style={{ color: 'white' }}>{team.city}</span><br />
                    </li>
                    </ul>
                    <ul>
                    </ul>
                    <ul>
                    <li key={team.id}>
                    <img src={team.logo} alt={team.name} style={{ width: '200px', height: '150px' }} />
                  </li>
                </ul>
              </div>
            ))
          ) : null}
           
           {teamstats && team ? (
  teamstats.map((stats) => (
    
    <div style={{ background: 'linear-gradient(to bottom, black, black)', border: 'gold ', padding: '10px', display: 'flex', flexDirection: 'row' }}>
      <h1>Stats</h1>
    
      <ul>
      <select value={Season} onChange={handleSeasonChange}>
  <option value="">Select a season</option>
  {seasons.map((season) => (
    <option key={season} value={season}>
      {season}
    </option>
  ))}
</select>
        <li key={stats.games}>
          <p style={{ color: 'gold' }}>Games:</p> <span style={{ color: 'white' }}>{stats.games}</span><br />
          <p style={{ color: 'gold' }}>Fast Break Points:</p> <span style={{ color: 'white' }}>{stats.fastBreakPoints}</span><br />
          <p style={{ color: 'gold' }}>Points in Paint:</p> <span style={{ color: 'white' }}>{stats.pointsInPaint}</span><br />
          <p style={{ color: 'gold' }}>Biggest Lead:</p> <span style={{ color: 'white' }}>{stats.biggestLead}</span><br />
          <p style={{ color: 'gold' }}>Second Chance Points:</p> <span style={{ color: 'white' }}>{stats.secondChancePoints}</span><br />
          <p style={{ color: 'gold' }}>Points off Turnovers:</p> <span style={{ color: 'white' }}>{stats.pointsOffTurnovers}</span><br />
          <p style={{ color: 'gold' }}>Longest Run:</p> <span style={{ color: 'white' }}>{stats.longestRun}</span><br />
          <p style={{ color: 'gold' }}>Points:</p> <span style={{ color: 'white' }}>{stats.points}</span><br />
          <p style={{ color: 'gold' }}>Field Goals Made:</p> <span style={{ color: 'white' }}>{stats.fgm}</span><br />
          </li>
          </ul>
          <ul>
          <li key={stats.games}>
          <p style={{ color: 'gold' }}>Field Goals Attempted:</p> <span style={{ color: 'white' }}>{stats.fga}</span><br />
          <p style={{ color: 'gold' }}>Field Goal Percentage:</p> <span style={{ color: 'white' }}>{stats.fgp}</span><br />
          <p style={{ color: 'gold' }}>Free Throws Made:</p> <span style={{ color: 'white' }}>{stats.ftm}</span><br />
          <p style={{ color: 'gold' }}>Free Throws Attempted:</p> <span style={{ color: 'white' }}>{stats.fta}</span><br />
          <p style={{ color: 'gold' }}>Free Throw Percentage:</p> <span style={{ color: 'white' }}>{stats.ftp}</span><br />
          <p style={{ color: 'gold' }}>Three-Pointers Made:</p> <span style={{ color: 'white' }}>{stats.tpm}</span><br />
          <p style={{ color: 'gold' }}>Three-Pointers Attempted:</p> <span style={{ color: 'white' }}>{stats.tpa}</span><br />
          <p style={{ color: 'gold' }}>Three-Point Percentage:</p> <span style={{ color: 'white' }}>{stats.tpp}</span><br />
          </li>
          </ul>
          <ul>
          <p style={{ color: 'gold' }}>Offensive Rebounds:</p> <span style={{ color: 'white' }}>{stats.offReb}</span><br />
          <p style={{ color: 'gold' }}>Defensive Rebounds:</p> <span style={{ color: 'white' }}>{stats.defReb}</span><br />
          <p style={{ color: 'gold' }}>Total Rebounds:</p> <span style={{ color: 'white' }}>{stats.totReb}</span><br />
          <p style={{ color: 'gold' }}>Assists:</p> <span style={{ color: 'white' }}>{stats.assists}</span><br />
          <p style={{ color: 'gold' }}>Personal Fouls:</p> <span style={{ color: 'white' }}>{stats.pFouls}</span><br />
          <p style={{ color: 'gold' }}>Steals:</p> <span style={{ color: 'white' }}>{stats.steals}</span><br />
          <p style={{ color: 'gold' }}>Turnovers:</p> <span style={{ color: 'white' }}>{stats.turnovers}</span><br />
          <p style={{ color: 'gold' }}>Blocks:</p> <span style={{ color: 'white' }}>{stats.blocks}</span><br />
          <p style={{ color: 'gold' }}>Plus/Minus:</p> <span style={{ color: 'white' }}>{stats.plusMinus}</span><br />
        
      </ul>
    </div>
  ))
) : null}
    </div>
  );
}

export default PlayerList;
