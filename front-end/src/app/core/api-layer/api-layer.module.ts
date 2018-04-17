import {
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { SpDialogType } from '../../shared/components/sp-dialog/sp-dialog-type.enum';
import { SpDialogModule } from '../../shared/components/sp-dialog/sp-dialog.module';
import { SpDialogService } from '../../shared/components/sp-dialog/sp-dialog.service';

@NgModule({
  imports: [
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule,
    SpDialogModule
  ],
  declarations: []
})
export class ApiLayerModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink, private spDialogService: SpDialogService) {
    this.init();
  }

  private static getAuthLink() {
    return setContext((_, {headers}) => {
      const token = localStorage.getItem('token');

      if (!token) {
        return {};
      } else {
        return {
          headers: (headers || new HttpHeaders()).append('Authorization', `Bearer ${token}`)
        };
      }
    });
  }

  private init() {
    const httpLink = this.getHttpLink();
    const authLink = ApiLayerModule.getAuthLink();
    const errorLink = this.getErrorLink();

    this.apollo.create({
      link: authLink
        .concat(errorLink)
        .concat(httpLink),
      cache: new InMemoryCache()
    });
  }

  private getHttpLink() {
    return this.httpLink.create({
      uri: 'https://localhost/graphql'
    });
  }

  private getErrorLink() {
    return onError(({graphQLErrors, networkError}) => {
      const text = networkError ? (networkError as HttpErrorResponse).statusText : graphQLErrors[0].message;

      this.spDialogService.open({
        type: SpDialogType.Alert,
        title: 'Помилка',
        text
      });
    });
  }
}
