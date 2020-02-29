
// cannot rely on the range, item id can exceed the the total count
// also, do not choose the item that returns 404, for example: https://swapi.co/api/starships/6/
// based on exposed api, presumed 10 items per page
const perPage = 10;

export const pickRandomItem = (min: number, max: number, excluded: number[] = []): number => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (excluded.includes(random)) {
    return pickRandomItem(min, max, excluded)
  }

  return random;
}

export const pickPaginated = (random: number): {page: number, elem: number} => {
  const page = Math.ceil(random / perPage);
  const elem = random % perPage;

  return {
    page,
    elem,
  }
}