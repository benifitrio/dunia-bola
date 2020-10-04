import { fetchData, Api } from '../source/data-source';
import { showLoader, hideLoader } from './preloader';

export default function standings() {
  const Content = document.getElementById('Content');
  const title = document.getElementById('headerTitle');
  const loadStandings = () => {
    showLoader();
    if ('caches' in window) {
      console.log('get data in cache');
      caches.match(Api.Standings).then((response) => {
        if (response) {
          response.json().then((data) => {
            showStandings(data);
          });
        }
      });
    }

    fetchData(Api.Standings)
      .then((data) => {
        showStandings(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // load data standings API
  function showStandings(data) {
    let content = '';
    const renderTarget = Content;

    data.standings[0].table.forEach((standing) => {
      content += `
            <tr>
                <td>
                    <img class="lazyload" src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
                </td>
                <td>${standing.team.name}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
            </tr>`;
    });

    renderTarget.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                    <th></th>
                    <th>Team Name</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>P</th>
                    <th>GF</th>
                    <th>GA</th>
                    <th>GD</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${content}
                </tbody>
            </table>
        </div>`;
    title.innerHTML = 'Seri A Italy Standings';
    hideLoader();
  }

  loadStandings();
}
