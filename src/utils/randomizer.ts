
// cannot rely on the range, item id can exceed the the total count
// also, do not choose the item that returns 404, for example: https://swapi.co/api/starships/6/
const perPage = 10;

export const PickRandomItem = (min: number, max: number, apiUrl: string) => {

  let random = Math.floor(Math.random() * (max - min + 1) + min);

  const page = Math.ceil(random / perPage);
  const elem = random % perPage;

  const randomizedItemUrl = `${apiUrl}?page=${page}`;

  fetch(randomizedItemUrl)
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      console.log(items.results[elem])
    });
}