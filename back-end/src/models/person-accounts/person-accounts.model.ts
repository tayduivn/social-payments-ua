import {
  Document,
  model,
  Schema
} from 'mongoose';
import { PersonAccounts } from '../../../../api-contracts/person-accounts/person-accounts';

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
          account: {
            type: String,
            required: true
          }
        }
      ]
    }
  ]
});

export interface PersonAccountsModel extends PersonAccounts {}

export const PersonAccountsModel = model<PersonAccountsModel & Document>('PersonAccounts', personAccountsModel, 'person_accounts');
