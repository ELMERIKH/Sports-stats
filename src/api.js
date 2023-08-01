const API_KEY = '470404c5ff3246ffb6e5556ca0ff21af';

const getTeamInfo = async (teamName) => {
  try {
    const response = await fetch(`https://api.football-data.org/v2/teams/${teamName}`, {
      headers: {
        'X-Auth-Token': API_KEY
      }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getTeamInfo;
