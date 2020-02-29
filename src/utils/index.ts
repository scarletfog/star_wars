import { PersonDataType, ShipDataType } from './playerModels';
import { ForceType, MatchStatus } from './constants';
import { PEOPLE_API, STARSHIPS_API, pickPaginated } from './apis';
import { pickRandomNumber } from './numbers';

export const getWinner = (attributeA: number, attributeB: number): MatchStatus => {
  if (attributeA > attributeB) {
    return MatchStatus.WINNER_PLAYER_A
  } else if (attributeA < attributeB) {
    return MatchStatus.WINNER_PLAYER_B
  } else if (attributeA === attributeB) {
    return MatchStatus.WINNER_DRAW
  } else {
    return MatchStatus.WINNER_NONE
  }
}

const normalizePersonalData = (response: any = {}): PersonDataType => ({
  name: response.name,
  gender: response.gender,
  mass: +response.mass,
});

const normalizeShipData = (response: any = {}): ShipDataType => ({
  name: response.name,
  model: response.model,
  crew: +response.crew,
});

const getApiByForceType = (force: ForceType): string => {
  switch (force) {
    case ForceType.PERSON: {
      return PEOPLE_API;
    }
    case ForceType.SHIP: {
      return STARSHIPS_API;
    }
  }
}

export const fetchData = (API: string) => (number: number): any => {
  const { page, elem } = pickPaginated(number);
  const url = `${API}?page=${page}`;

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      return items.results[elem];
    });
};

// closure
const fetchPeopleAPI = fetchData(PEOPLE_API);
const fetchShipAPI = fetchData(STARSHIPS_API);

export const fetchPersonData = (n: number): PersonDataType  => fetchPeopleAPI(n).then(normalizePersonalData);
export const fetchShipData = (n: number): ShipDataType  => fetchShipAPI(n).then(normalizeShipData);

export const getRandomNumbers = (fromCount: number): [number, number] => {
  const numberA = pickRandomNumber(1, fromCount);
  const numberB = pickRandomNumber(1, fromCount, [numberA]);

  return [numberA, numberB];
};

export const fetchRandomPersons = (fromCount: number): Promise<PersonDataType[]> => {
  return Promise.all(getRandomNumbers(fromCount).map(fetchPersonData))
};

export const fetchRandomShips = (fromCount: number): Promise<ShipDataType[]> => {
  return Promise.all(getRandomNumbers(fromCount).map(fetchShipData))
};

export const fetchCount = (force: ForceType): Promise<number> => {
  const url = getApiByForceType(force);

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      return response.count;
    });
};