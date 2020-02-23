
export const getItem = (page: number, elem: number, apiUrl: string) => {

  const randomizedItemUrl = `${apiUrl}?page=${page}`;

  return fetch(randomizedItemUrl)
    .then((response) => {
      return response.json();
    })
    .then((items) => {
      return items.results[elem]
    });

}


// getShip = () => {
//   getItem(,s,SHTAEPAUU)


// }

// getPERS = () => {
//   getItem(,s,PORESKONNLA)


// }