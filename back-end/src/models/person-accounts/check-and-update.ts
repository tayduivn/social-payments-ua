import { PersonAccountInfo } from './person-account-info';
import { PersonAccountsModel } from './person-accounts.model';

export function checkAndUpdate(personAccount: PersonAccountInfo) {
  return new Promise((resolve, reject) => {
    if (personAccount.id) {
      resolve(personAccount);
    } else {
      delete personAccount.id;

      PersonAccountsModel.findOne({
          person: personAccount.person
        })
        .where('financialInstitutions.financialInstitution').equals(personAccount.financialInstitution)
        .exec(function (err, item: any) {
          if (err) { reject(err); }

          console.log('item', item);
          const count = item ?
            item.financialInstitutions[0].accounts.filter((item: any) => item === personAccount.account).length : -1;
          console.log('count', count);

          if (count === -1) {
            resolve(PersonAccountsModel.create({
              person: personAccount.person,
              financialInstitutions: [
                {
                  financialInstitution: personAccount.financialInstitution,
                  accounts: [
                    personAccount.account
                  ]
                }
              ]
            }));
          } else if (count === 0) {

          } else {
            resolve(personAccount);
          }
        });
    }
  });
}
