import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Payment } from '../../../../api-contracts/payment/payment';
import { financialInstitutionSchema } from '../financial-institution/financial-institution.model';
import { personSchema } from '../person/person.model';

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
  financialInstitution: financialInstitutionSchema,
  person: personSchema
});

paymentSchema.index(
  {
    description: 'text'
  },
  {
    name: 'paymentDescriptionIndex'
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