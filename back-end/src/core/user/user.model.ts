import {
  model,
  Schema,
  Document,
} from 'mongoose';

const UserSchema = new Schema({
  login: String,
  fullName: String,
  password: String,
  token: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role'
  }
});

export interface UserModel extends Document {
  login: string;
  fullName: string;
  password: string;
  token: string;
}

export const UserModel = model<UserModel>('User', UserSchema);

