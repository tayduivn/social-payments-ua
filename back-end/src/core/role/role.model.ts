import {
  model,
  Schema,
  Document,
} from 'mongoose';

const RoleSchema = new Schema({
  name: String
});

export interface RoleModel extends Document {
  name: string;
}

export const RoleModel = model<RoleModel>('Role', RoleSchema);
