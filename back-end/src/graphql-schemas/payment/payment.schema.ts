import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './payment.resolvers';

export const schema = makeExecutableSchema({
  typeDefs: importSchema('../api-contracts/payment/payment.graphql'),
  resolvers
} as any);