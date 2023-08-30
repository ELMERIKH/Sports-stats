import React, { useState } from 'react';

const BLeagues = () => {
  const [league, setLeague] = useState('39');
  const [season, setSeason] = useState('2022');
  const leagueOptions = {
    'NBA': '12',
    'EuroLeague': '11',
    'ACB League': '13',
    'CBA (Chinese Basketball Association)': '14',
    'NBL (National Basketball League)': '15',
    'BSL (Basketball Super League)': '16',
    'BBL (British Basketball League)': '17',
    'BCL (Basketball Champions League)': '18',
    'ABA League': '19',
    'KBL (Korean Basketball League)': '20',
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
    const response = await fetch('/Bstandings.html');
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
        
        <select   className="dropdown-select"
          value={league}
          onChange={(e) => setLeague(e.target.value)}
        >
          {Object.entries(leagueOptions).map(([label, value]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select  className="dropdown-select"
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
            background: 'gold',
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
        src="/Bstandings.html"
        width="100%"
        height="500"
      />
      
    </div>
  );
};

export default BLeagues;