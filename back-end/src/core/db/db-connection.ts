import {
  Db,
  MongoClient
} from 'mongodb';
import { Config } from '../config/config';
import { LogLevel } from '../logger/log-levels.type';
import { Logger } from '../logger/logger';

type PromiseResolver = {resolve: (connection: Db) => void, reject: (err?: any) => void};

export class DbConnection {
  private static readonly dbName = 'social-payments-ua';
  private static readonly client = new MongoClient(Config.db.uri);

  private static db: Db = null;

  private static connectionList: PromiseResolver[] = [];

  public static connect(): void {
    DbConnection.client.connect()
      .then(
        DbConnection.connectionHandler,
        DbConnection.connectionErrorHandler
      );
  }

  public static get connection(): Promise<Db> {
    return DbConnection.db ? Promise.resolve(DbConnection.db) : new Promise<Db>((resolve, reject) => {
      DbConnection.connectionList.push({resolve, reject});
    });
  }

  private static connectionHandler(client: MongoClient): void {
    Logger.log(LogLevel.info, 'DB connection opened');
    DbConnection.db = client.db(DbConnection.dbName);
    DbConnection.resolveConnections();
  }

  private static connectionErrorHandler(error: any): void {
    Logger.log(LogLevel.error, `Error during db connection: ${error}`);
    DbConnection.resolveConnections(error);
  }

  private static resolveConnections(error?: any): void {
    DbConnection.connectionList.forEach((resolver: PromiseResolver) => {
      if (DbConnection.db) {
        resolver.resolve(DbConnection.db);
      } else {
        resolver.reject(error);
      }
    });

    DbConnection.connectionList = [];
  }
}