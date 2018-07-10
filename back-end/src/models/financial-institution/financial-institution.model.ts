import {
  model,
  Schema
} from 'mongoose';

export const financialInstitutionSchemaFields = {
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
};

export const FinancialInstitutionModel = model(
  'FinancialInstitution',
  new Schema(financialInstitutionSchemaFields),
  'financial_institutions'
);
