import mongoose from 'mongoose';
import { Config } from '../config/config';

export function connectDb() {
  mongoose.connect(Config.db.uri, {
    useNewUrlParser: true
  });
  mongoose.set('useCreateIndex', true);
  // mongoose.set('debug', true);

  const dbConnection = mongoose.connection;

  dbConnection.on('error', (err: any) => {
    console.log('db connection error', err);
  });

  dbConnection.on('open', () => {
    console.log('db connection opened');
  });

  process.on('SIGINT', function(){
    mongoose.connection.close(() => {
      console.log("Termination, mongoose default connection is disconnected due to application termination");
      process.exit(0)
    });
  });
}
