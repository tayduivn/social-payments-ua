import nconf from 'nconf';
import { ConfigDefaults } from './config-defaults';
import { ConfigKeys } from './config-keys.type';
import { DbConfig } from './db-config';
import { EnvConfig } from './env-config';

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
nconf
  .argv()
  .env()
  .file({file: 'config/server.json'});

export class Config {
  public static get db(): DbConfig {
    return {
      uri: nconf.get(ConfigKeys.DbUri) || ConfigDefaults[ConfigKeys.DbUri]
    };
  }

  public static get env(): EnvConfig {
    return {
      port: nconf.get(ConfigKeys.Port) || ConfigDefaults[ConfigKeys.Port],
      production: !!nconf.get(ConfigKeys.Production),
      protocol: nconf.get(ConfigKeys.Protocol) || ConfigDefaults[ConfigKeys.Protocol]
    }
  }
}
