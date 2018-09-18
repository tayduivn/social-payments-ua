import { PersonFinancialInstitutions } from '../../../../api-contracts/person-accounts/person-financial-institutions';
import { PersonAccountInfo } from './person-account-info';
import { PersonAccountsModel } from './person-accounts.model';

function createPersonAccount(personAccount: PersonAccountInfo) {
  return PersonAccountsModel.create({
    personId: personAccount.personId,
    financialInstitutions: [
      {
        financialInstitutionId: personAccount.financialInstitutionId,
        accounts: [{
          account: personAccount.account
        }]
      }
    ]
  });
}

function updatePersonAccount(personAccountModel: PersonAccountsModel, personAccount: PersonAccountInfo) {
  const fiIndex = personAccountModel.financialInstitutions.findIndex((item: PersonFinancialInstitutions) => {
    return item.financialInstitutionId.toString() === personAccount.financialInstitutionId;
  });

  if (fiIndex > -1) {
    const accounts = personAccountModel.financialInstitutions[fiIndex].accounts;
    const accountIndex = accounts.findIndex((item: any) => item.account === personAccount.account);

    if (accountIndex > -1) {
      // todo: return
    } else {
      accounts.push({account: personAccount.account});

      return personAccountModel.save();
    }
  } else {
    personAccountModel.financialInstitutions.push({
      financialInstitutionId: personAccount.financialInstitutionId,
      accounts: [{
        account: personAccount.account
      }]
    });

    return personAccountModel.save();
  }
}

export function checkAndUpdate(personAccountInfo: PersonAccountInfo) {
  return PersonAccountsModel.findOne({
    personId: personAccountInfo.personId
  })
    .then((personAccount: PersonAccountsModel) => {
      if (personAccount) {
        return updatePersonAccount(personAccount, personAccountInfo);
      } else {
        return createPersonAccount(personAccountInfo);
      }
    });
}
