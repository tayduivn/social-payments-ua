import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  NextFunction,
  Request,
  Response
} from 'express';
import morgan from 'morgan';
import { connectDb } from './core/db/db-connection';
import { HttpError } from './core/http-error';
import { initRoutes } from './routes/init-routes';

const appConfig = express();

appConfig.use(cors());
appConfig.use(morgan('dev'));
appConfig.use(bodyParser.json());
appConfig.use(bodyParser.urlencoded({extended: false}));
appConfig.use(cookieParser());

if (process.env.HEROKU) {
  appConfig.use(express.static('../front-end/dist/social-payments-ua'));
}

connectDb();
initRoutes(appConfig);

// catch 404 and forward to error handler
appConfig.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.HEROKU) {
    res.redirect('/index.html');
  } else {
    const err = new Error('Not Found') as any;
    err.status = 404;
    next(err);
  }
});

// error handler
appConfig.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.send(Object.assign({error: true, message: err.message}, err));
});

export const app = appConfig;