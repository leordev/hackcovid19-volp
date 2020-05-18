export enum EntityType {
  User = 1,
  Institution = 2,
}

export interface Address {
  id: number;
  type: EntityType;
  entity_id: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
}
