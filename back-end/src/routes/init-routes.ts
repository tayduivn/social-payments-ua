import { Express } from 'express-serve-static-core';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { User } from '../../../api-contracts/user/user';
import { UserModel } from '../models/user/user.model';
import { apiRouter } from './api/api';
import { loginRouter } from './login';
import { reportsRouter } from './reports/reports';
import { rootRouter } from './root';

export function initRoutes(app: Express) {
  // Bearer token authentication
  passport.use(new BearerStrategy((token: string, done) => {
    UserModel.findOne({token}, (err, user: User) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      return done(null, user);
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
