
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = {
  input: document.querySelector('#search-box'),
  listCountry: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const name = e.target.value.trim();
  if (!name.length) {
    refs.listCountry.innerHTML = '';
  }
  if (name.length) {
    fetchCountries(name)
      .then(renderListContry)
      .catch(onError);
  }
}
function renderListContry(contrys) {
  if (contrys.length > 10) {
    refs. listCountry.innerHTML = '';
    refs. info.innerHTML = '';
    return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.',{cssAnimationDuration: 500});
  }
  if (contrys.length === 1) {
    const markup = contrys
      .map(contry => {
        const { flags, name, population, capital, languages, timezones} = contry;
        return `<div class="country-item">
        <img class="country-img" width="30"  src="${flags.svg}" alt="${name}">
        <h2 class="country-name">${name.common}</h2>
      </div>
      <div class="card-body">
        <p class="info-text"><span class="value">Capital:</span> ${capital}</p>
        <p class="info-text"><span class="value">Population:</span> ${population}</p>
        <p class="info-text"><span class="value">Languages:</span> ${Object.values(languages)}
        <p class="info-text"><span class="value">Timezones:</span> ${timezones}</p>
        </p>
      </div>`;
      })
      .join(' ');
    refs. listCountry.innerHTML = '';
    return (refs. info.innerHTML = markup);
  }
  // (contrys.length > 1 && <= 10 )
  const markup = contrys
    .map(contry => {
      const { flags, name } = contry;
      return `<li class="item-cantry">
    <img width="30"  src="${flags.svg}" alt="${name}">
    ${name.common}
    </li>`;
    })
    .join(' ');
  refs. info.innerHTML = '';
  refs. listCountry.innerHTML = markup;
}

function onError() {
  Notiflix.Notify.failure('Oops, there is no country with that name',{cssAnimationDuration: 500});
  refs. listCountry.innerHTML = '';
  refs. info.innerHTML = '';
}