import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { DataProxy } from 'apollo-cache';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UserResponseModel } from '../../../../../api-contracts/user/user-response.model';
import { FetchResult } from '../../../../../back-end/node_modules/apollo-link/lib';
import { UserDialogModel } from './user-dialog/user-dialog.model';

interface Users {
  users: UserResponseModel[]
}

@Injectable()
export class UsersService {
  private static readAllUsersQuery = gql(require('webpack-graphql-loader!./users.graphql'));

  constructor(private apollo: Apollo) {}

  private static getUsersInStore(store: DataProxy) {
    return store.readQuery<Users>({query: UsersService.readAllUsersQuery});
  }

  private static writeUsersStoreData(store, data) {
    store.writeQuery({query: UsersService.readAllUsersQuery, data});
  }

  public getUsers(): Observable<UserResponseModel[]> {
    return this.apollo.watchQuery<Users>({
      query: UsersService.readAllUsersQuery
    })
      .valueChanges
      .pipe(
        map((r: ApolloQueryResult<Users>) => r.data.users)
      );
  }

  public submitUser(userInfo: UserDialogModel): Observable<UserResponseModel> {
    const userFields = Object.assign({password: userInfo.password}, userInfo.user);

    return this.apollo.mutate<UserResponseModel>({
      mutation: gql(require('webpack-graphql-loader!./submit-user.graphql')),
      variables: {user: userFields},
      optimisticResponse: {
        __typename: 'Mutation',
        submitUser: Object.assign({__typename: 'User'}, userFields)
      },
      update: (store: DataProxy, {data: {submitUser}}) => {
        // skip this fn logic for edit action
        if (userFields.id) { return; }

        const data = UsersService.getUsersInStore(store);

        data.users.push(submitUser);

        UsersService.writeUsersStoreData(store, data);
      }
    })
    .pipe(
      map((res: FetchResult<UserResponseModel>) => res.data.submitUser)
    );
  }

  public removeUser(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql(require('webpack-graphql-loader!./remove-user.graphql')),
      variables: {
        id
      },
      update: (store: DataProxy, {data: {removeUser}}) => {
        const data = UsersService.getUsersInStore(store);

        _.remove(data.users, user => user.id === removeUser);

        UsersService.writeUsersStoreData(store, data);
      }
    });
  }
}
