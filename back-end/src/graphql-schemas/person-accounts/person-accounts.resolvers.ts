import { PersonAccountsModel } from '../../models/person-accounts/person-accounts.model';

export const resolvers = {
  Query: {
    personAccounts: () => PersonAccountsModel.find()
  }
};
