// вар 1
import './css/styles.css';
import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;

const refs = {
  search: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

let formValue = '';

refs.search.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));


function onInput(evt) {
  evt.preventDefault();
    formValue = refs.search.value.trim();
  if (formValue === '') {
    clearRender();
    return;
  }

  fetchCountries(formValue)
    .then(countries => {
      if (countries.length === 1) {
        clearRender();
        renderCountryTitle(countries);
        renderCountryInfo(countries);
      } else if (countries.length > 1 && countries.length <= 10) {
        clearRender();
        renderCountryTitle(countries);
      } else if (countries.length > 10) {
        clearRender();
        Notify.info(
          'Too many mathces found. Please enter a more spesific name',
          { timeout: 100, cssAnimationDuration: 1000 }
        );
      }
    })
    .catch(catchError);
}

// function renderCountryTitle(countries) {
//   const markup = countries
//     .map(country => {
//       return `<li class="country-item">
//       <img class='country-img' src="${country.flags.svg}" alt="flag">
//       <p class="country-name">${country.name.official}</p>
//     </li>`;
//     })
//     .join('');
//   refs.countryList.insertAdjacentHTML('beforeend', markup);
// }

// function renderCountryInfo(countries) {
//   const langs = countries.map(({ languages }) => Object.values(languages).join(', '));
//   const markup = countries
//     .map(country => {
//       return `<p class="info-text">Capital: <span class="value">${country.capital}</span></p>
//       <p class="info-text">Population: <span class="value">${country.population}</span></p>
//       <p class="info-text">languages: <span class="value">${langs}</span></p>`;
//     })
//     .join('');
//   refs.countryInfo.insertAdjacentHTML('beforeend', markup);
// }

// function clearRender() {
//   refs.countryInfo.innerHTML = '';
//   refs.countryList.innerHTML = '';
// }

// function catchError() {
//   clearRender();
//   Notify.failure('Oops, there is no country with that name', {
//     timeout: 100,
//     cssAnimationDuration: 1000,
//   });
// }
// вариант 2
// import './css/styles.css';
// import Notiflix from 'notiflix';
// import API from './js/fetchCountries';

// var debounce = require('lodash.debounce');
// const DEBOUNCE_DELAY = 300;
// const ref = {
//   inputEL: document.querySelector('#search-box'),
//   ulEl: document.querySelector('.country-list'),
//   divInfoEl: document.querySelector('.country-info'),
// };

// ref.inputEL.addEventListener('input', debounce(sorcheContry, DEBOUNCE_DELAY));

// function sorcheContry(e) {
//   const name = e.target.value.trim();
//   if (!name.length) {
//     ref.ulEl.innerHTML = '';
//   }
//   if (name.length) {
//     API.fetchCountries(name).then(renderListContry).catch(onFetchError);
//   }
// }
// function renderListContry(contrys) {
//   if (contrys.length > 10) {
//     ref.ulEl.innerHTML = '';
//     ref.divInfoEl.innerHTML = '';
//     return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
//   }
//   if (contrys.length === 1) {
//     const markup = contrys
//       .map(contry => {
//         const { flags, name, population, capital, languages } = contry;
//         return `<div class="card-icon-name">
//         <img class="card-icon" width="30"  src="${flags.svg}" alt="${name}">
//         <h2 class="card-name">${name.common}</h2>
//       </div>
//       <div class="card-body">
//         <p class="card-text"><span>Capital:</span> ${capital}</p>
//         <p class="card-text"><span>Population:</span> ${population}</p>
//         <p class="card-text"><span>Languages:</span> ${Object.values(languages)}
//         </p>
//       </div>`;
//       })
//       .join(' ');
//     ref.ulEl.innerHTML = '';
//     return (ref.divInfoEl.innerHTML = markup);
//   }
//   const markup = contrys
//     .map(contry => {
//       const { flags, name } = contry;
//       return `<li class="item-cantry">
//     <img width="30"  src="${flags.svg}" alt="${name}">
//     ${name.common}
//     </li>`;
//     })
//     .join(' ');
//   ref.divInfoEl.innerHTML = '';
//   ref.ulEl.innerHTML = markup;
// }

// function onFetchError() {
//   Notiflix.Notify.failure('Oops, there is no country with that name');
//   ref.ulEl.innerHTML = '';
//   ref.divInfoEl.innerHTML = '';
// }