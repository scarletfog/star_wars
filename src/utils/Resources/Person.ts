import { Resource } from 'rest-hooks';

export default class PersonResource extends Resource {

  readonly name: string = '';
  readonly birth_year: string = '';
  readonly eye_color: string = '';
  readonly gender: 'Male' | 'Female' | 'unknown' | 'n/a' = 'unknown';
  readonly hair_color: string = '';
  readonly height: string = '';
  readonly mass: string = '';
  readonly skin_color: string = '';
  readonly homeworld: string = '';
  readonly films: Array<String> = [];
  readonly species: Array<String> = [];
  readonly starships: Array<String> = [];
  readonly vehicles: Array<String> = [];
  readonly url: string = '';
  readonly created: string = '';
  readonly edited: string = '';

  // pk tells Rest Hooks how to normalize the data
  // we miss ids in distinct item
  pk() {
    
    return this.name?.toString();
  }

  static urlRoot = 'https://swapi.co/api/people/';
}