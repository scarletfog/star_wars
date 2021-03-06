// cannot rely on the range, item ID can exceed the the total count, for example: count: 37, person ID: 88
// based on the API presumed 10 items per page

const perPage = 10;
const API = 'https://swapi.co/api';

export const PEOPLE_API = `${API}/people/`;
export const STARSHIPS_API = `${API}/starships/`;

export const pickPaginated = (nElement: number): { page: number, elem: number } => {
  const page = Math.ceil(nElement / perPage);
  // Array elem counts from 0
  const elem = (nElement - 1) % perPage;

  return {
    page,
    elem,
  }
}
