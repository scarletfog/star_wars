// cannot rely on the range, item ID can exceed the the total count, for example: count: 37, person ID: 88
// based on the API presumed 10 items per page

export const pickRandomNumber = (min: number, max: number, excluded: number[] = []): number => {
  let random = Math.floor(Math.random() * (max - min + 1) + min);

  if (excluded.includes(random)) {
    return pickRandomNumber(min, max, excluded)
  }

  return random;
}
