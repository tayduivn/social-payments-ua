import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './user.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/user/user.graphql'),
  resolvers
} as any);