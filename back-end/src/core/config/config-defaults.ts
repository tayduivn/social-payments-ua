import { ConfigKeys } from './config-keys.type';

export const ConfigDefaults = {
  [ConfigKeys.DbUri]: 'mongodb://localhost/social-payments-ua',
  [ConfigKeys.Port]: 443,
  [ConfigKeys.Protocol]: 'HTTPS'
};
