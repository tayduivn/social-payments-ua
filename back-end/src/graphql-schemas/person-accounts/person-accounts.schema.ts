import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './person-accounts.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/person-accounts/person-accounts.graphql'),
  resolvers
} as any);
