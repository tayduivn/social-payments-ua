import { PersonAccountInfo } from './person-account-info';
import { PersonAccountsModel } from './person-accounts.model';

function createPersonAccount(personAccount: PersonAccountInfo) {
  return PersonAccountsModel.create({
    person: personAccount.person,
    financialInstitutions: [
      {
        financialInstitution: personAccount.financialInstitution,
        accounts: [{
          account: personAccount.account
        }]
      }
    ]
  });
}

function updatePersonAccount(personAccountModel: any, personAccount: PersonAccountInfo) {
  const fiIndex = personAccountModel.financialInstitutions.findIndex((item: any) => {
    return item.financialInstitution.toString() === personAccount.financialInstitution;
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
      financialInstitution: personAccount.financialInstitution,
      accounts: [{
        account: personAccount.account
      }]
    });

    return personAccountModel.save();
  }
}

export function checkAndUpdate(personAccount: PersonAccountInfo) {
  return new Promise((resolve, reject) => {
    if (personAccount.id) {
      resolve(); //todo return
    } else {
      delete personAccount.id; // null case

      PersonAccountsModel.findOne({
          person: personAccount.person
        })
        .exec(function (err, item: any) {
          if (err) { reject(err); }

          if (!item) {
            resolve(createPersonAccount(personAccount))
          } else {
            resolve(updatePersonAccount(item, personAccount));
          }
        });
    }
  });
}
