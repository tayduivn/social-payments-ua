import { Person } from '../../../../api-contracts/person/person';
import { PersonModel } from './person.model';

export function checkAndUpdate(person: Person) {
  if (person._id) {
    return Promise.resolve(person);
  }

  return PersonModel.find({
    passportNumber: person.passportNumber,
    fullName: person.fullName
  })
    .then((persons: PersonModel[]) => {
      if (persons.length) {
        return Promise.resolve(persons[0]);
      } else {
        delete person._id;
        return PersonModel.create(person);
      }
    });
}

