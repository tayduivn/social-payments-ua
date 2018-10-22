import { User } from '../../../../api-contracts/user/user';
import { MongoosePromise } from '../mongoose-promise';
import { UserModel } from './user.model';

export class UserModelService {
  public static getAll(): MongoosePromise<UserModel[]> {
    return UserModel
      .find()
      .select('login fullName isAdmin');
  }

  public static create(user: User): Promise<UserModel> {
    return UserModel
      .create(user);
  }

  public static update(id: string, user: User): MongoosePromise<UserModel> {
    return UserModel
      .findByIdAndUpdate(id, user);
  }

  public static remove(id: string): MongoosePromise<UserModel> {
    return UserModel
      .findByIdAndRemove(id)
  }
}
