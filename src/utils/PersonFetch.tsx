import { useResource } from 'rest-hooks';
import React from "react";
import PersonResource from './Resources/Person';

const PersonFetch = ({ name }: { name: string }) => {
  const person = useResource(PersonResource.detailShape(), { name });
  return (
    <div>
      <h2>{person.name}</h2>
      <div>{person.mass}</div>
      <div>{person.hair_color}</div>
    </div>
  );
}

export default PersonFetch;