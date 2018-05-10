import { PersonModel } from '../../models/person/person.model';

export const resolvers = {
  Query: {
    persons: () => PersonModel.find()
  }
};