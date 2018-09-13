import { PersonAddress } from './person-address';

export interface Person {
  _id: string;
  fullName: string;
  passportNumber: string;
  identityCode?: string;
  address: PersonAddress;
}
