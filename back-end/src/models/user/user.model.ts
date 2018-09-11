import {
  Document,
  model,
  Schema
} from 'mongoose';
import { User } from '../../../../api-contracts/user/user';
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

export interface UserModel extends User {
  token: string
}

export const UserModel = model<UserModel & Document>('User', userSchema);

