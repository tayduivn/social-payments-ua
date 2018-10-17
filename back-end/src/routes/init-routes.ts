import { Express } from 'express-serve-static-core';
import moment from 'moment';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { UserModel } from '../models/user/user.model';
import { apiRouter } from './api/api';
import { loginRouter } from './login';
import { reportsRouter } from './reports/reports';
import { rootRouter } from './root';

export function initRoutes(app: Express) {
  // Bearer token authentication
  passport.use(new BearerStrategy((token: string, done: (error: any, user?: any) => void) => {
    UserModel.findOne({token}, (err, user: UserModel) => {
      // return to stop executing function
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      const diff = moment().diff(moment(user.created), 'hours');

      return diff > 12 ? done(null, false) : done(null, user);
    });
  }));

  // no authentication routes
  app.use('/', rootRouter);
  app.use('/login', loginRouter);

  // routes with authentication
  app
    .all('*', passport.authenticate('bearer', { session: false }))
    .use('/reports', reportsRouter)
    .use('/api', apiRouter);
}
