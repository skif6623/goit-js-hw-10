import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { createMarkupList, createCountryMarkup } from './js/createMarkup';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
let value = '';

refs.input.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
  value = e.target.value.trim().toLowerCase();

  if (value === '') {
    clearField();
    return;
  }

  fetchCountries(value)
    .then(data => {
      clearField();

      if (data.length === 1) {
        countryMarkup(data);
      } else if (data.length > 10) {
        tooManyResults();
      } else {
        countryListMarkup(data);
      }
    })
    .catch(error => noResults());
}

function clearField() {
  refs.list.innerHTML = '';
  refs.block.innerHTML = '';
}
function countryMarkup(country) {
  const markupCountry = country.map(createCountryMarkup);
  refs.block.insertAdjacentHTML('beforeend', markupCountry);
}

function countryListMarkup(countries) {
  const markupList = countries.map(createMarkupList).join('');
  refs.list.insertAdjacentHTML('beforeend', markupList);
}

function tooManyResults() {
  Notify.info('Too many matches found. Please enter a more specific name.');
  return;
}

function noResults() {
  clearField();
  Notify.failure('Oops, there is no country with that name');
}
