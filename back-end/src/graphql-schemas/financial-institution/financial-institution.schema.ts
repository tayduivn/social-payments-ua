import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './financial-institution.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/financial-institution/financial-institution.graphql'),
  resolvers
} as any);