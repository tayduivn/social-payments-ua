import { DataQueriesModel } from './data-queries.model';

/**
 * Heroku deployment variables
 */

const dataQueries: DataQueriesModel = {
  loginEndpoint: '/login',
  apiEndpoint: '/api',
  reportsEndpoint: '/generated-reports'
};

export const environment = {
  production: true,
  dataQueries
};
