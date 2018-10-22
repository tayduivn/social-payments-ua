import { Person } from '../../../../api-contracts/person/person';
import { MongoosePromise } from '../mongoose-promise';
import { PersonModel } from './person.model';

export class  PersonModelService {
  public static resolve (person: Person): Promise<Person | PersonModel> {
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

  public static getAll(): MongoosePromise<PersonModel[]> {
    return PersonModel
      .find()
      .populate('address.street')
  }
}

