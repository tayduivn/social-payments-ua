import { PersonAddressModel } from './person-address.model';

export interface PersonModel {
  id: string;
  fullName: string;
  passportNumber: string;
  identityCode?: string;
  address: PersonAddressModel;
}
