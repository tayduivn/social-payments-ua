import { UserModel } from '../models/user/user.model';

export interface TokenInfo {
  isValid: boolean;
  user?: UserModel
}
