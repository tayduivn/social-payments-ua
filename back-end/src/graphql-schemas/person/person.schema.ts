import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './person.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/person/person.graphql'),
  resolvers
} as any);