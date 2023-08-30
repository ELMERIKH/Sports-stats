import React, { useState } from 'react';

const Leagues = () => {
  const [league, setLeague] = useState('39');
  const [season, setSeason] = useState('2022');
  const leagueOptions = {
    'Premier League': '39',
    'La Liga': '140',
    'Bundesliga': '78',
    'Serie A': '135',
    'Ligue 1': '61',
    'UEFA Champions League': '2',
    'UEFA Europa League': '3',
    'FIFA World Cup': '1',
    'Copa America': '4',
    'UEFA European Championship': '5',
    'Eredivisie': '88',
    'Primeira Liga': '94',
    'Brasileirão': '96',
    'Major League Soccer (MLS)': '253',
    'Argentinian Primera División': '87',
    'Campeonato Brasileiro Série A': '113',
    'Championship': '40',
    'Scottish Premiership': '94',
    'Liga MX': '88',
    'Russian Premier League': '77',
    // Add more leagues here...
  };
  const seasonOptions = {
    '2000': '2000',
    '2001': '2001',
    '2002': '2002',
    '2003': '2003',
    '2004': '2004',
    '2005': '2005',
    '2006': '2006',
    '2007': '2007',
    '2008': '2008',
    '2009': '2009',
    '2010': '2010',
    '2011': '2011',
    '2012': '2012',
    '2013': '2013',
    '2014': '2014',
    '2015': '2015',
    '2016': '2016',
    '2017': '2017',
    '2018': '2018',
    '2019': '2019',
    '2020': '2020',
    '2021': '2021',
    '2022': '2022',
    '2023': '2023',
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fetch the content of jj.html
    const response = await fetch('/standings.html');
    const htmlContent = await response.text();

    // Update the HTML content with the new league and season values
    const updatedContent = htmlContent
      .replace(/data-league="[^"]*"/, `data-league="${league}"`)
      .replace(/data-season="[^"]*"/, `data-season="${season}"`);

    // Create a Blob URL for the updated content
    const blob = new Blob([updatedContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Set the Blob URL as the src of the iframe
    document.querySelector('#iframeComponent').src = url;
  };

  return (
    <div>
         <form onSubmit={handleSubmit}>
        <select   className="dropdown-select1"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
        >
          {Object.entries(leagueOptions).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select  className="dropdown-select1"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {Object.entries(seasonOptions).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
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
          Submit
        </button>
      </form>
      <iframe
        id="iframeComponent"
        title="External Content"
        src="/standings.html"
        width="100%"
        height="500"
      />
      
    </div>
  );
};

export default Leagues;