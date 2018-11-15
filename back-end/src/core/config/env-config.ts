export interface EnvConfig {
  production: boolean;
  port: number | string;
  protocol: 'HTTP' | 'HTTPS';
}
