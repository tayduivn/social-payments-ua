import { PersonModel } from './person.model';

export function checkAndUpdate(person: any) {
  return new Promise((resolve, reject) => {
    if (person.id) {
      resolve(person);
    } else {
      PersonModel.count({
        passportNumber: person.passportNumber,
        fullName: person.fullName
      }, function (err, count) {
        if (err) { reject(err); }

        if (!count) {
          resolve(PersonModel.create(person));
        } else {
          resolve(person);
        }
      });
    }
  });
}

