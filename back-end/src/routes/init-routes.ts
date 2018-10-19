import { Express } from 'express-serve-static-core';
import passport from 'passport';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Token } from '../core/token';
import { UserModel } from '../models/user/user.model';
import { apiRouter } from './api/api';
import { loginRouter } from './login';
import { reportsRouter } from './reports/reports';

export function initRoutes(app: Express) {
  // Bearer token authentication
  passport.use(new BearerStrategy((token: string, done: (error: any, user?: any) => void) => {
    UserModel.findOne({token}, (err, user: UserModel) => {
      // return to stop executing function
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      return Token.isExpired(token)
        .then((expired) => expired ? done(null, false) : done(null, user));
    });
  }));


  // no authentication routes
  app.use('/login', loginRouter);

  // routes with authentication
  app.use('/generated-reports', passport.authenticate('bearer', { session: false }), reportsRouter)
  app.use('/api', passport.authenticate('bearer', { session: false }), apiRouter);
}
