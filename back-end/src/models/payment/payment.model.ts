import {
  model,
  Schema
} from 'mongoose';

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
  financialInstitution: {
    name: {
      type: String,
      required: [true, 'Ім\'я фінансової установи обов\'язкове поле']
    },
    mfo: {
      type: String,
      required: [true, 'МФО обов\'язкове поле']
    },
    edrpou: {
      type: String,
      required: [true, 'Код ЄДРПОУ обов\'язкове поле']
    }
  },
  person: {
    fullName: {
      type: String,
      required: [true, 'Прізвище, ім\'я, по батькові одержувача обов\'язкове поле']
    },
    passportNumber: {
      type: String,
      required: [true, 'Серія та номер паспорта обов\'язкове поле']
    },
    identityCode: String,
    address: {
      street: {
        type: String,
        required: [true, 'Вулиця обов\'язкове поле']
      },
      house: {
        type: String,
        required: [true, 'Номер будинку обов\'язкове поле']
      },
      houseSection: String,
      apartment: String
    }
  }
});

export const PaymentModel = model('Payment', paymentSchema);


