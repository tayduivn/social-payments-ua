import mongoose from 'mongoose';

export function connectDb() {
  mongoose.connect('mongodb://localhost/social-payments-ua');
  const db = mongoose.connection;

  db.on('error', (err: any) => {
    console.log('!!! db connection error', err);
  });

  db.on('open', () => {
    console.log('db connection opened');
  });
}
