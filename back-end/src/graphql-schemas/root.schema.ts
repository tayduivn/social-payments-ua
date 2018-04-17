import { mergeSchemas } from 'graphql-tools';
import { schema as userSchema } from './user/user.schema';

export const rootSchema = mergeSchemas({
  schemas: [userSchema]
});