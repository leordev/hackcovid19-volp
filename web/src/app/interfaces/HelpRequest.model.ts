import { User } from './user';
import { PhoneNumber } from './Phone.model';
import { Address } from './Address.model';

export enum HelpStatus {
  Pending = 1,
  Accepted = 2,
  InProgress = 3,
  Completed = 4,
  Canceled = 5,
}

export interface HelpStatusApi {
  status: HelpStatus;
  paidAmount?: number;
  receipt?: string;
}

export interface NewHelpRequest {
  description: string;
  offered_amount: number;
  address_id: number;
}

export interface HelpRequest {
  id: number;
  requester_id: number;
  address_id: number;
  description: string;
  offered_amount: number;
  helper_id: number;
  paid_amount: number;
  receipt: string;
  status: HelpStatus;
  created_at: Date;
  completed_at: Date;
}

export interface HelpList {
  helped: HelpRequest[];
  requests: HelpRequest[];
}

export interface FullHelpRequest extends HelpRequest {
  requester: User;
  address: Address;
  requester_phones: PhoneNumber[];
  helper: User;
  helper_phones: PhoneNumber[];
}

export interface HelpRequestItem extends HelpRequest {
  latitude: number;
  longitude: number;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}
