
// cannot rely on the range, item id can exceed the the total count
// also, do not choose the item that returns 404, for example: https://swapi.co/api/starships/6/
// based on exposed api, presumed 10 items per page
const perPage = 10;

export const PickRandomItem = (min: number, max: number, apiUrl: string) => {

  let random = Math.floor(Math.random() * (max - min + 1) + min);

  const page = Math.ceil(random / perPage);
  const elem = random % perPage;

  // const randomizedItemUrl = `${apiUrl}?page=${page}`;

  return {
    page,
    elem,
  }

  // return fetch(randomizedItemUrl)
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((items) => {
  //     return items.results[elem]
  //   });

}