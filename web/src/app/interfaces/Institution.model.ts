import { PhoneNumber } from './Phone.model';

export interface InstitutionObj {
  id: number;
  name: string;
  description: string;
  profile_picture: string;
  latitude: number;
  longitude: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export interface FullInstitution {
  id: number;
  name: string;
  unique_document: string;
  owner_id: number;
  description: string;
  bank_info: string;
  profile_picture: string;
  website_url: string;
  created_at: string;
  addresses: InstitutionAddress[];
  phones: PhoneNumber[];
}

export interface InstitutionAddress {
  id: number;
  type: number;
  entity_id: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
  created_at: string;
}

export interface InstitutionPhone {
  id: number;
  type: number;
  entity_id: number;
  phone: string;
}

export interface NewInstitution {
  name: string;
  unique_document: string;
  description: string;
  bank_info: string;
  profile_picture: string;
  website_url: string;
}
