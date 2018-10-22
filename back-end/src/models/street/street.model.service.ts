import { Street } from '../../../../api-contracts/street/street';
import { MongoosePromise } from '../mongoose-promise';
import { StreetModel } from './street.model';

export class StreetModelService {
  public static resolve(street: Street): Promise<Street | StreetModel> {
    if (street._id) {
      return Promise.resolve(street);
    } else {
      delete street._id;
      return StreetModel.create(street);
    }
  }

  public static getAll(): MongoosePromise<StreetModel[]> {
    return StreetModel
      .find()
      .sort('name');
  }
}