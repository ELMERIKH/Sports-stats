import React, { useEffect, useState } from 'react';

const Livescores = () => {
  const [teamData, setTeamData] = useState(null);

 

  return (
    <div className="team-info">
     
      <iframe src="https://www.scorebat.com/embed/livescore/" frameborder="0" width="600" height="760" allowfullscreen allow='autoplay; fullscreen' style={{width: '100%', height: '760px', overflow: 'hidden', display: 'block'}} className="_scorebatEmbeddedPlayer_"></iframe>
  
  
    </div>
  );
};

export default Livescores;