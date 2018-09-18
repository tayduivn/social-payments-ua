import {
  Document,
  model,
  Schema
} from 'mongoose';
import { Person } from '../../../../api-contracts/person/person';

export const personSchemaFields = {
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
};

export type PersonModel = Person & Document;

export const PersonModel = model<PersonModel>('Person', new Schema(personSchemaFields), 'persons');

