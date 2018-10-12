import { Street } from '../../../../api-contracts/street/street';
import { StreetModel } from './street.model';

export function checkAndUpdate(street: Street) {
  if (street._id) {
    return Promise.resolve(street);
  } else {
    delete street._id;
    return StreetModel.create(street);
  }
}
