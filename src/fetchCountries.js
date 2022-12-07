export function fetchCountries(name) {
  return  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages,timezones`)
  .then(countries => {
    if (!countries.ok) {
      throw new Error(countries.status);
    }
    return countries.json();
  })
  }