import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../../../../../api-contracts/user/user';
import {apiEndpoint} from '../../shared/constants/api-endpoint';
import {UserDialogModel} from './user-dialog/user-dialog.model';

@Injectable()
export class UsersService {
  private readonly usersUrl = `${apiEndpoint}/users`;
  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public submitUser(userInfo: UserDialogModel): any { //Observable<User> {
    // const userFields = Object.assign({password: userInfo.password}, userInfo.user);
    //
    // return this.apollo.mutate<UserResponse>({
    //   mutation: submitMutation,
    //   variables: {user: userFields},
    //   optimisticResponse: {
    //     __typename: 'Mutation',
    //     submitUser: Object.assign({__typename: 'User'}, userFields)
    //   },
    //   update: (store: DataProxy, {data: {submitUser}}) => {
    //     // skip this fn logic for edit action
    //     if (userFields.id) { return; }
    //
    //     const data = UsersService.getUsersInStore(store);
    //
    //     data.users.push(submitUser);
    //
    //     UsersService.writeUsersStoreData(store, data);
    //   }
    // })
    // .pipe(
    //   map((res: FetchResult<UserResponse>) => res.data.submitUser)
    // );
  }

  public removeUser(id: string): Observable<any> {
    // return this.apollo.mutate({
    //   mutation: removeMutation,
    //   variables: {
    //     id
    //   },
    //   update: (store: DataProxy, {data: {removeUser}}) => {
    //     const data = UsersService.getUsersInStore(store);
    //
    //     _.remove(data.users, user => user.id === removeUser);
    //
    //     UsersService.writeUsersStoreData(store, data);
    //   }
    // });
  }
}
