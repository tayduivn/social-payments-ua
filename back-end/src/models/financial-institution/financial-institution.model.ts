import {
  Document,
  model,
  Schema
} from 'mongoose';
import { FinancialInstitution } from '../../../../api-contracts/financial-institution/financial.institution';

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

export type FinancialInstitutionModel = FinancialInstitution & Document;

export const FinancialInstitutionModel = model<FinancialInstitutionModel>(
  'FinancialInstitution',
  new Schema(financialInstitutionSchemaFields),
  'financial_institutions'
);
