import passport from 'passport';
import passportJwt from 'passport-jwt';
import db from '../database/connection';

const { Strategy, ExtractJwt } = passportJwt;

const { authSecret } = require('../.env');

const passportToAppp = () => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  const strategy = new Strategy(params, (payload, done) => {
    db('users')
    .where({ id: payload.id })
    .first()
    .then(user => done(null, user ? { ...payload } : false))
    .catch(err => done(err, false))
  });

  passport.use(strategy);

  return {
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}

export default passportToAppp;