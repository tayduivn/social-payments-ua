import {
  model,
  Schema
} from 'mongoose';

const personAccountsModel = new Schema({
  person: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  financialInstitutions: [
    {
      financialInstitution: {
        type: Schema.Types.ObjectId,
        ref: 'FinancialInstitution',
        required: true
      },
      accounts: [
        {
          type: String,
          required: true
        }
      ]
    }
  ]
});

export const PersonAccountsModel = model('PersonAccounts', personAccountsModel, 'person_accounts');
