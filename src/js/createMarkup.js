export function createMarkupList({ name, flags }) {
  return `<li>
            <img src="${flags.svg}" alt="flag" width="30" height="20">
            <span class='countries-list'>${name.common}</span>
          </li>`;
}

export function createCountryMarkup({
  name,
  flags,
  capital,
  population,
  languages,
}) {
  const language = Object.values(languages).join(', ');

  return `<img src="${flags.svg}" alt="flag" width="60" height="40">
      <span class='country-name'>${name.official}</span>
      <p><span class='span-style'>Capital:</span> ${capital}</p>
      <p><span class='span-style'>Population:</span> ${population}</p>
      <p><span class='span-style'>Languages:</span> ${language}</p>`;
}
