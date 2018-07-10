import { Types } from 'mongoose';
import { checkAndUpdate as fiCheckAndUpdate } from '../../models/financial-institution/check-and-update';
import { checkAndUpdate as personCheckAndUpdate } from '../../models/person/check-and-update';
import { checkAndUpdate as personAccountsCheckAndUpdate } from '../../models/person-accounts/check-and-update';
import { PaymentModel } from '../../models/payment/payment.model';

export const resolvers = {
  Query: {
    payments: () => PaymentModel.find()
  },
  Mutation: {
    submitPayment(obj: any, {payment}: any) {
      if (Types.ObjectId.isValid(payment.id)) {
        // here will be update logic for payment edit action

        // return UserModel.findByIdAndUpdate(payment.id, payment, {
        //   new: true
        // });
      } else {
        let financialInstitution: any;
        let person: any;

        fiCheckAndUpdate(payment.financialInstitution)
          .then((fi) => {
            financialInstitution = fi;
            return personCheckAndUpdate(payment.person)
          })
          .then((prsn) => {
            person = prsn;
            return personAccountsCheckAndUpdate({
              id: null,
              person: person.id,
              financialInstitution: financialInstitution.id,
              account: payment.accountNumber
            });
          });

        return PaymentModel.create(Object.assign(payment, {id: new Types.ObjectId()}));
      }
    }/*,
    removeUser(obj: any, {id}: any) {
      return UserModel.findByIdAndRemove(id)
        .then((user: UserModel) => user.id);
    }*///
  }
};