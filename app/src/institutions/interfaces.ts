export interface InstitutionPin {
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

export interface Address {
  id: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Institution {
  id: number;
  name: string;
  unique_document: string;
  owner_id: number;
  description: string;
  bank_info: string;
  profile_picture: string;
  website_url: string;
  created_at: Date;
  addresses: Address[];
  phones: string[];
}
