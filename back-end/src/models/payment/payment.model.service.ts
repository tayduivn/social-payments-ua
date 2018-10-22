import { FinancialInstitution } from '../../../../api-contracts/financial-institution/financial.institution';
import { Payment } from '../../../../api-contracts/payment/payment';
import { PaymentsFilter } from '../../../../api-contracts/payment/payments-filter';
import { Person } from '../../../../api-contracts/person/person';
import { Street } from '../../../../api-contracts/street/street';
import { FinancialInstitutionModelService } from '../financial-institution/financial-institution.model.service';
import { MongoosePromise } from '../mongoose-promise';
import { PersonAccountsModelService } from '../person-accounts/person-accounts.model.service';
import { PersonModelService } from '../person/person.model.service';
import { StreetModelService } from '../street/street.model.service';
import { PaymentModel } from './payment.model';

export class PaymentModelService {
  public static create(payment: Payment): Promise<PaymentModel> {
    let financialInstitution: FinancialInstitution;
    let person: Person;

    return FinancialInstitutionModelService.resolve(payment.financialInstitution)
      .then((financialInstitutionResponse) => {
        financialInstitution = financialInstitutionResponse;
        return StreetModelService.resolve(payment.person.address.street);
      })
      .then((str: Street) => {
        payment.person.address.street = str;
        return PersonModelService.resolve(payment.person);
      })
      .then((personResponse) => {
        person = personResponse;
        return PersonAccountsModelService.resolve({
          personId: person._id,
          financialInstitutionId: financialInstitution._id,
          account: payment.accountNumber
        });
      })
      .then(() => {
        payment.financialInstitution = financialInstitution;
        payment.person._id = person._id;
        delete payment._id;

        return PaymentModel.create(payment);
      });
  }

  public static find(filter: PaymentsFilter): MongoosePromise<PaymentModel[]> {
    return PaymentModel
      .find(filter)
      .sort('-date');
  }
}
