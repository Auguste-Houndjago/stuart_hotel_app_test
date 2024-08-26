import { Country } from 'country-state-city';

// Obtenir la liste des pays
const COUNTRIES = Country.getAllCountries();

// Définir le type `SelectMenuOption` basé sur la structure des objets dans `COUNTRIES`
export type SelectMenuOption = {
  isoCode: string; // ISO code du pays
  name: string; // Nom du pays
};

// Mapper `COUNTRIES` pour correspondre à ce type
export const countryOptions: SelectMenuOption[] = COUNTRIES.map(country => ({
  isoCode: country.isoCode,
  name: country.name,
}));
