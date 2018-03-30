import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';

@NgModule({
  imports: [
    HttpClientModule, // provides HttpClient for HttpLink
    ApolloModule,
    HttpLinkModule
  ],
  declarations: []
})
export class ApiLayerModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    this.init();
  }

  private init() {
    const httpLink = this.getHttpLink();
    const authContext = this.getContext();

    this.apollo.create({
      link: authContext.concat(httpLink),
      cache: new InMemoryCache()
    });
  }

  private getHttpLink() {
    return this.httpLink.create({
      uri: 'https://localhost/graphql'
    });
  }

  private getContext() {
    return setContext((_, {headers}) => {
      const token = localStorage.getItem('token');
      console.log('settoken');

      if (!token) {
        return {};
      } else {
        return {
          headers: (headers || new HttpHeaders()).append('Authorization', `Bearer ${token}`)
        };
      }
    });
  }
}
