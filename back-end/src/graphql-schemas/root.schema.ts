import { mergeSchemas } from 'graphql-tools';
import { schema as userSchema } from './user/user.schema';
import { schema as paymentSchema } from './payment/payment.schema';

export const rootSchema = mergeSchemas({
  schemas: [userSchema, paymentSchema]
});