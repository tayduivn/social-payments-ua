import {
  model,
  Schema
} from 'mongoose';
import { financialInstitutionSchemaFields } from '../financial-institution/financial-institution.model';
import { personSchemaFields } from '../person/person.model';

const paymentSchema = new Schema({
  date: {
    type: Date,
    required: [true, 'Дата платежу обов\'язкове поле']
  },
  sum: {
    type: Number,
    required: [true, 'Сума платежу обов\'язкове поле'],
    min: [0.01, 'Сума платежу повинна бути більше 0']
  },
  accountNumber: String,
  description: {
    type: String,
    required: [true, 'Призначення платежу обов\'язкове поле']
  },
  financialInstitution: financialInstitutionSchemaFields,
  person: personSchemaFields
});

export const PaymentModel = model('Payment', paymentSchema);


