import { Types } from 'mongoose';
import { UserResponseModel } from '../../../../api-contracts/user/user-response.model';
import { UserModel } from '../../models/user/user.model';

export const resolvers = {
  Query: {
    users(): {then: () => Promise<UserResponseModel[]>} {
      return UserModel.find();
    }
  },
  Mutation: {
    submitUser(obj: any, {user}: any) {
      if (Types.ObjectId.isValid(user.id)) {
        return UserModel.findByIdAndUpdate(user.id, user, {
          new: true
        });
      } else {
        return UserModel.create(Object.assign(user, {id: new Types.ObjectId()}));
      }
    },
    removeUser(obj: any, {id}: any) {
      return UserModel.findByIdAndRemove(id)
        .then((user: UserModel) => user.id);
    }
  }
};