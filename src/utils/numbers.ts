// cannot rely on the range, item id can exceed the the total count
// also, do not choose the item that returns 404, for example: https://swapi.co/api/starships/6/
// based on exposed api, presumed 10 items per page

export const pickRandomNumber = (min: number, max: number, excluded: number[] = []): number => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (excluded.includes(random)) {
    return pickRandomNumber(min, max, excluded)
  }

  return random;
}
