import { DataQueriesModel } from './data-queries.model';

const dataQueries: DataQueriesModel = {
  loginEndpoint: '/login',
  apiEndpoint: '/api',
  reportsEndpoint: '/generated-reports',
  webSocket: 'ws://'
};

export const environment = {
  production: true,
  dataQueries
};
