import { Resource, ReadShape, SchemaDetail, AbstractInstanceType } from 'rest-hooks';
import { PEOPLE_API } from '../../utils/apis';

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
  pk() {
    return this.name ?.toString();
  }

  static listShape<T extends typeof Resource>(this: T) {
    return {
      ...super.listShape(),
      schema: { results: [this.asSchema()] },
    };
  }

  static detailShape<T extends typeof Resource> (this: T): ReadShape<SchemaDetail<AbstractInstanceType<T>>> {
    const superShape = this.detailShape();
    return {
      ...superShape,
      fetch: async (params: any) => {
        console.log(params)
        const { name } = params;
        const random = Number(name);
        
        const perPage = 10;

        const page = Math.ceil(random / perPage);
        const elem = random % perPage;
        
        const response = await superShape.fetch({
          ...params,
          url: `${PEOPLE_API}?page=${page}`,
        });

        console.log();
        // @ts-ignore
        return response.results[elem] as T;
      },
    };
  }

  static urlRoot = PEOPLE_API;
}