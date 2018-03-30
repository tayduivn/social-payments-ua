import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './login.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/auth/login.graphql'),
  resolvers
} as any);