export class PersonAccountsModel {
  id: string;
  person: string;
  financialInstitutions: [
    {
      financialInstitution: string;
      accounts: [{
        account: string;
      }];
    }
  ]
}
