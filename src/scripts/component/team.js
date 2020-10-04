import swal from 'sweetalert';
import { fetchData, Api } from '../source/data-source';
import { showLoader, hideLoader } from './preloader';
import dbPromise from './db';

let teamsData = null;
const Content = document.getElementById('Content');
const title = document.getElementById('headerTitle');

export default function teams() {
  const loadTeams = () => {
    showLoader();
    if ('caches' in window) {
      caches.match(Api.Teams).then((response) => {
        if (response) {
          response.json().then((data) => {
            showTeams(data);
          });
        }
      });
    }

    fetchData(Api.Teams)
      .then((data) => {
        showTeams(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function showTeams(data) {
    let content = '';
    const renderTarget = Content;
    teamsData = data;

    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite').objectStore('teams');
      const txFTeams = tx.getAll() || [];
      return txFTeams;
    })
      .then((team) => {
        showLoader();
        const favTeams = team.map((i) => i.id);
        function renderButton(teamId) {
          if (!favTeams.includes(teamId)) {
            return `
                    <a class="btn-floating btn-medium halfway-fab waves-effect waves-light green addFavorite"
                    >
                      <i id="icon-${teamId}" class="large material-icons" data-id="${teamId}">favorite</i>
                    </a>`;
          }
          return '';
        }

        data.teams.forEach((team) => {
          content += `
              <div class="col s12 m6 l4">
                  <div class="card" id="card" style="height: 22rem;">
                      <div class="card-image">
                          <img class="lazyload" src="${team.crestUrl}" style="padding: 16px; margin: auto; height: 135px; width: 135px">
                          ${renderButton(team.id)}
                      </div>
                      <div class="card-content">
                          <h6>${team.name}</h6>
                          <p>Founded: ${team.founded}</p>
                          <p>Venue: ${team.venue}</p>
                          <a href="${team.website}">${team.website}</a>
                      </div>
                  </div>
              </div>`;

          title.innerHTML = 'Seri A Italy Teams';
          renderTarget.innerHTML = content;
          hideLoader();
          const addFavorite = document.querySelectorAll('.addFavorite');

          addFavorite.forEach((el) => {
            el.addEventListener('click', (e) => {
              const getId = e.target.dataset.id;
              addFavoriteTeam(getId);
            });
          });
        });
      });
  }

  function addFavoriteTeam(teamId) {
    // eslint-disable-next-line eqeqeq
    const teamObject = teamsData.teams.filter((el) => el.id == teamId)[0];
    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams');
      store.add(teamObject);
      return tx.complete;
    })
      .then(() => {
        // remove the button
        const element = document.getElementById(`icon-${teamId}`);
        element.parentNode.remove();
        swal({
          title: 'succes!',
          text: `${teamObject.name} ditambahkan ke Team Favorit.`,
          icon: 'success',
          button: 'Ok!',
        });
      });
  }

  loadTeams();
}
