import {
  Document,
  model,
  Schema
} from 'mongoose';
import { addUserModelMiddleware } from './user.model.middleware';

const userSchema = new Schema({
  login: {
    type: String,
    required: [true, 'Логін обов\'язкове поле'],
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Повне ім\'я обов\'язкове поле']
  },
  password: {
    type: String,
    required: [true, 'Пароль обов\'язкове поле']
  },
  token: String,
  isAdmin: Boolean
});

addUserModelMiddleware(userSchema);

export interface UserModel extends Document {
  login: string;
  fullName: string;
  password: string;
  token: string;
  isAdmin: boolean;
}

export const UserModel = model<UserModel>('User', userSchema);

