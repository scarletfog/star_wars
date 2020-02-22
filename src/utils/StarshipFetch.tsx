import { useResource } from 'rest-hooks';
import React from "react";
import StarshipResource from './Resources/Starship';

const ShipFetch = ({ name }: { name: string }) => {
  const ship = useResource(StarshipResource.detailShape(), { name });
  return (
    <div>
      <h2>{ship.name}</h2>
      <h2>{ship.model}</h2>
      <h2>{ship.crew}</h2>
    </div>
  );
}

export default ShipFetch;