// import {
//   HttpClientModule,
//   HttpErrorResponse,
//   HttpHeaders
// } from '@angular/common/http';
// import { NgModule } from '@angular/core';
// import { SpDialogType } from '../shared/components/dialog/sp-dialog-type.enum';
// import { SpDialogModule } from '../shdisared/components/dialog/sp-dialog.module';
// import { SpDialogService } from '../shared/components/dialog/sp-dialog.service';
// import { AuthService } from './auth.service';
//
// @NgModule({
//   imports: [
//     HttpClientModule, // provides HttpClient for HttpLink
//     ApolloModule,
//     HttpLinkModule,
//     SpDialogModule
//   ],
//   declarations: []
// })
// export class ApiLayerModule {
//   constructor(
//     private apollo: Apollo,
//     private httpLink: HttpLink,
//     private spDialogService: SpDialogService,
//     private authService: AuthService) {
//       this.init();
//   }
//
//   private init() {
//     const httpLink = this.getHttpLink();
//     const authLink = this.getAuthLink();
//     const errorLink = this.getErrorLink();
//
//     this.apollo.create({
//       link: authLink
//         .concat(errorLink)
//         .concat(httpLink),
//       cache: new InMemoryCache()
//     });
//   }
//
//   private getAuthLink() {
//     return setContext((_, {headers}) => {
//       const token = this.authService.getToken();
//
//       if (!token) {
//         return {};
//       } else {
//         return {
//           headers: (headers || new HttpHeaders()).append('Authorization', `Bearer ${token}`)
//         };
//       }
//     });
//   }
//
//   // todo: change to flexible solution
//   private getHttpLink() {
//     return this.httpLink.create({
//       uri: 'https://localhost/graphql'
//     });
//   }
//
//   private getErrorLink() {
//     return onError(({graphQLErrors, networkError, response}) => {
//       let errorText: string[] = [];
//
//       if (networkError) {
//         errorText.push((networkError as HttpErrorResponse).statusText + ': ');
//
//         if ((networkError as any).error && (networkError as any).error.errors) {
//           const {errors} = (networkError as any).error;
//           if (errors && errors.length) {
//             errors.forEach(err => errorText.push(err && err.message ? err.message : ''))
//           }
//         }
//       } else {
//         errorText.push(graphQLErrors[0].message);
//       }
//
//       this.spDialogService.open({
//         type: SpDialogType.Alert,
//         title: 'Помилка',
//         text: errorText.join(' ')
//       });
//     });
//   }
// }
