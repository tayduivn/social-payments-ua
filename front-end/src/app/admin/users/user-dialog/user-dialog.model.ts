import { UserResponseModel } from '../../../../../../api-contracts/user/user-response.model';

export interface UserDialogModel {
  user: UserResponseModel;
  password: string;
}
