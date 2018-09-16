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

export interface FinancialInstitutionModel extends FinancialInstitution {}

export const FinancialInstitutionModel = model<FinancialInstitution & Document>(
  'FinancialInstitution',
  new Schema(financialInstitutionSchemaFields),
  'financial_institutions'
);
