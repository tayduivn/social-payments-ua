import { PersonAddressModel } from './person-address.model';

export interface PersonModel {
  fullName: string;
  passportNumber: string;
  identityCode?: string;
  address: PersonAddressModel;
}
