import mongoose from 'mongoose';
import { Config } from '../config/config';
import { LogLevel } from '../logger/log-levels.type';
import { Logger } from '../logger/logger';

export function connectDb() {
  mongoose.connect(Config.db.uri, {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err: any) => {
    Logger.log(LogLevel.info, `db connection error ${err}`);
  });

  dbConnection.on('open', () => {
    Logger.log(LogLevel.info, 'db connection opened');
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(() => {
      Logger.log(LogLevel.info, 'Termination, mongoose default connection is disconnected due to application termination');
      process.exit(0)
    });
  });
}
