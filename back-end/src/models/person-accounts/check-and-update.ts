import { PersonAccountInfo } from './person-account-info';
import { PersonAccountsModel } from './person-accounts.model';

function createPersonAccount(personAccount: PersonAccountInfo) {
  return PersonAccountsModel.create({
    person: personAccount.person,
    financialInstitutions: [
      {
        financialInstitution: personAccount.financialInstitution,
        accounts: [
          personAccount.account
        ]
      }
    ]
  });
}

function updatePersonAccount(personAccountModel: any, personAccount: PersonAccountInfo) {
  const financialInstitution = personAccountModel.financialInstitutions.filter((item: any) => {
    return item.financialInstitution === personAccount.financialInstitution;
  });
  // const count = personAccountModel.financialInstitutions[0].accounts.filter((item: any) => item === personAccount.account).length : -1;
}

export function checkAndUpdate(personAccount: PersonAccountInfo) {
  return new Promise((resolve, reject) => {
    if (personAccount.id) {
      resolve();
    } else {
      delete personAccount.id; // null case

      PersonAccountsModel.findOne({
          person: personAccount.person
        })
        .exec(function (err, item: any) {
          if (err) { reject(err); }

          if (!item) {
            resolve(createPersonAccount(personAccount))
          } /*else {
            resolve(updatePersonAccount(item, personAccount));
          }*/
          // console.log('item', item);
          // const count = item ?
          //   item.financialInstitutions[0].accounts.filter((item: any) => item === personAccount.account).length : -1;
          //
          // if (count === -1) {
          //   resolve();
          // } else if (count === 0) {
          //
          // } else {
          //   resolve(personAccount);
          // }
        });
    }
  });
}
