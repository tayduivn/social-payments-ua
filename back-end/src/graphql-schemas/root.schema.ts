import { mergeSchemas } from 'graphql-tools';
import { schema as loginSchema } from './auth/login.schema';

export const rootSchema = mergeSchemas({
  schemas: [loginSchema]
});
