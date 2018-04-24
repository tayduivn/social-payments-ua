import { Types } from 'mongoose';
import { PaymentModel } from '../../models/payment/payment.model';

export const resolvers = {
  // Query: {
  //   users(): {then: () => Promise<UserResponseModel[]>} {
  //     return UserModel.find();
  //   }
  // },
  Mutation: {
    submitPayment(obj: any, {payment}: any) {
      if (Types.ObjectId.isValid(payment.id)) {
        // return UserModel.findByIdAndUpdate(payment.id, payment, {
        //   new: true
        // });
      } else {
        return PaymentModel.create(Object.assign(payment, {id: new Types.ObjectId()}));
      }
    }/*,
    removeUser(obj: any, {id}: any) {
      return UserModel.findByIdAndRemove(id)
        .then((user: UserModel) => user.id);
    }*/
  }
};