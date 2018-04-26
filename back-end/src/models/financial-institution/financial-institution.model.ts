import {
  model,
  Schema
} from 'mongoose';

const financialInstitutionSchema = new Schema({
  name: String,
  mfo: {
    type: String,
    required: [true, 'МФО обов\'язкове поле']
  },
  edrpou: {
    type: String,
    required: [true, 'Код ЄДРПОУ обов\'язкове поле']
  }
});

export const FinancialInstitutionModel = model(
  'FinancialInstitution',
  financialInstitutionSchema,
  'financial_institutions'
);
