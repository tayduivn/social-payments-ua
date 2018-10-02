import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Payment } from '../../../../api-contracts/payment/payment';
import { financialInstitutionSchemaFields } from '../financial-institution/financial-institution.model';
import { personSchemaFields } from '../person/person.model';

const paymentSchema = new Schema({
  date: {
    type: Date,
    required: [true]
  },
  sum: {
    type: Number,
    required: [true],
    min: [0.01]
  },
  accountNumber: String,
  description: {
    type: String,
    required: [true]
  },
  financialInstitution: financialInstitutionSchemaFields,
  person: personSchemaFields
});

paymentSchema.index(
  {
    accountNumber: 'text',
    description: 'text',
    'financialInstitution.name': 'text',
    'financialInstitution.mfo': 'text',
    'financialInstitution.edrpou': 'text',
    'person.fullName': 'text',
    'person.passportNumber': 'text',
    'person.identityCode': 'text',
    'person.address.street': 'text',
    'person.address.house': 'text',
    'person.address.houseSection': 'text',
    'person.address.apartment': 'text'
  },
  {
    name: 'accountsTextSearchIndex'
  }
);

export type PaymentModel = Payment & Document;

export const PaymentModel = model<PaymentModel>('Payment', paymentSchema);

PaymentModel.on('index', function (err) {
  if (err) {
    console.log('PaymentModel index error: %s', err);
  } else {
    console.log('PaymentModel indexing complete');
  }
});