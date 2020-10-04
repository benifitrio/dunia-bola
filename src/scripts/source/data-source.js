const config = {
  Api_Key: '25bbb04d480d437abe5cb98a472cc10e',
  Base_Key: 'https://api.football-data.org/v2/',
  Id: 2019,
};

const Api = {
  Standings: `${config.Base_Key}competitions/${config.Id}/standings`,
  Teams: `${config.Base_Key}competitions/${config.Id}/teams`,
  Request_Header: {
    headers: {
      'X-Auth-Token': config.Api_Key,
    },
  },
};

const fetchData = (url) => fetch(url, Api.Request_Header)
  .then((res) => {
    if (res.status !== 200) {
      console.log(`Error: ${res.status}`);
      return Promise.reject(new Error(res.statusText));
    } return Promise.resolve(res);
  }).then((res) => res.json())
  .catch((err) => {
    console.log('fetch failed', err);
  });

export { fetchData, Api, config };
