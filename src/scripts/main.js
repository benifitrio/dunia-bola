import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import mainNav from './view/nav';
import regSW from './source/regSW';
import 'materialize-css/dist/css/materialize.min.css';
import '../style/style.css';
// eslint-disable-next-line import/extensions
import 'materialize-css/dist/js/materialize.min.js';

window.addEventListener('DOMContentLoaded', () => {
  mainNav();
  regSW();
});
