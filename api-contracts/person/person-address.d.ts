import { Street } from '../street/street';

export interface PersonAddress {
  street: Street;
  house: string;
  houseSection?: string;
  apartment?: string;
}
