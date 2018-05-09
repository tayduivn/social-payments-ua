import { Types } from 'mongoose';
import { checkAndUpdate as fiCheckAndUpdate } from '../../models/financial-institution/check-and-update';
import { checkAndUpdate as personCheckAndUpdate } from '../../models/person/check-and-update';
import { PaymentModel } from '../../models/payment/payment.model';

export const resolvers = {
  Query: {
    payments: () => PaymentModel.find()
  },
  Mutation: {
    submitPayment(obj: any, {payment}: any) {
      console.log('res this', this);
      if (Types.ObjectId.isValid(payment.id)) {
        // return UserModel.findByIdAndUpdate(payment.id, payment, {
        //   new: true
        // });
      } else {
        fiCheckAndUpdate(payment.financialInstitution)
          .then(() => personCheckAndUpdate(payment.person));

        return PaymentModel.create(Object.assign(payment, {id: new Types.ObjectId()}));
      }
    }/*,
    removeUser(obj: any, {id}: any) {
      return UserModel.findByIdAndRemove(id)
        .then((user: UserModel) => user.id);
    }*///
  }
};