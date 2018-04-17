import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import morgan from 'morgan';
import passport from 'passport';
import {Strategy as BearerStrategy } from 'passport-http-bearer';
import { connectDb } from './core/db/db-connection';
import { UserModel } from './models/user/user.model';
import { graphqlRouter } from './routes/graphql';
import { loginRouter } from './routes/login';
import { rootRouter } from './routes/root';

const appConfig = express();

appConfig.use(cors());
appConfig.use(morgan('dev'));
appConfig.use(bodyParser.json());
appConfig.use(bodyParser.urlencoded({extended: false}));
appConfig.use(cookieParser());

connectDb();

// no authentication routes
appConfig.use('/', rootRouter);
appConfig.use('/', loginRouter);

appConfig.use('/', passport.authenticate('bearer', { session: false }), graphqlRouter);

// Bearer token authentication
passport.use(new BearerStrategy((token: string, done) => {
  UserModel.findOne({token}, (err, user: UserModel) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    return done(null, user);
  });
}));

// secured routes
appConfig.use('/', passport.authenticate('bearer', { session: false }), graphqlRouter);

// catch 404 and forward to error handler
appConfig.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});

// error handler
appConfig.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);

  res.send(Object.assign({error: true, message: err.message}, err));
});

export const app = appConfig;