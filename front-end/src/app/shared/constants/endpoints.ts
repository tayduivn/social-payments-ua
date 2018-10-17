import { environment } from '../../../environments/environment';

export const apiEndpoint = environment.production ? '/api' : 'https://localhost/api';
export const reportsEndpoint = environment.production ? '/reports' : 'https://localhost/reports';
