import swal from 'sweetalert';
import { showLoader, hideLoader } from './preloader';
import dbPromise from './db';

export default function favorites() {
  const Content = document.getElementById('Content');
  const title = document.getElementById('headerTitle');
  let _dataTeams = null;

  const loadFavoriteTeams = () => {
    showLoader();
    const html = `
          <a class="waves-effect waves-light btn-small red" id="deleteAll">Kosongkan tim favorit</a>
          <div class="row" id="listFavoriteTeamElement" style="margin-top: 16px;"></div>`;
    Content.innerHTML = html;
    title.innerHTML = 'My Favorites Teams';
    document.getElementById('deleteAll').addEventListener('click', () => {
      deletesAllFavoriteTeam();
    });
    renderFavoriteList(); // render favorited teams
    hideLoader();
  };

  function renderFavoriteList() {
    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite').objectStore('teams');
      return tx.getAll() || [];
    })
      .then((team) => {
        _dataTeams = team;
        const listFavorite = document.getElementById('listFavoriteTeamElement');
        if (team.length) {
          let _favorite = '';
          // eslint-disable-next-line no-shadow
          team.forEach((team) => {
            _favorite += `
                    <div class="col s12 m6 l6">
                      <div class="card" id="card-${team.id}" id="card">
                        <div class="card-image">
                          <img class="lazyload" src="${team.crestUrl}" style="padding: 16px; margin: auto; width: 130px">
                          <a class="btn-floating btn-medium halfway-fab waves-effect waves-light red removeFavorite" data-id="${team.id}">
                            <i id="card-${team.id}" class="large material-icons">delete</i>
                          </a>
                        </div>
                        <div class="card-content">
                          <div class="center flow-text"><strong>${team.name}</strong></div>
                          <div class="center"><strong>Founded:</strong> ${team.founded}</div>
                          <div class="center"><strong>Venue: </strong>${team.venue}</div>
                          <div class="center"><a href="${team.website}" target="_blank"><strong>Website : </strong>${team.website}</a></div>
                        </div>
                      </div>
                    </div>`;

            listFavorite.innerHTML = _favorite;
            const removeFavorite = document.querySelectorAll('.removeFavorite');
            removeFavorite.forEach((el) => {
              el.addEventListener('click', (e) => {
                const getId = e.target.parentElement.dataset.id;
                removeFavoriteTeam(getId);
              });
            });
          });
        } else {
          listFavorite.innerHTML = '<h5 class="center-align">You have no favorite team! get one !</h5>';
        }
        hideLoader();
      });
  }

  // <==delete one favorite==>
  function removeFavoriteTeam(teamId) {
    const teamObject = _dataTeams.filter((el) => el.id === parseInt(teamId))[0];

    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      tx.objectStore('teams').delete(parseInt(teamId));
    }).then(() => {
      const element = document.getElementById(`card-${teamId}`);
      element.parentNode.removeChild(element);
      swal({
        title: 'succes!',
        text: `berhasil menghapus ${teamObject.name} dari Team Favorit.`,
        icon: 'success',
        button: 'Ok!',
      });
    }).catch((e) => {
      swal({
        title: `kesalahan!, cek jaringan anda.${e}`,
      });
    });
  }

  // delete allFavorites
  function deletesAllFavoriteTeam() {
    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams').clear();
      return store;
    })
      .then(() => {
        loadFavoriteTeams();
        swal('Poof! Your favorites has been deleted!', {
          icon: 'success',
        });
      });
  }

  loadFavoriteTeams();
}
