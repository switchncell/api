import passport from 'passport'
import jwt from 'jsonwebtoken';
import User from'../models/User';
import { Strategy, ExtractJwt } from 'passport-jwt'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secret'
}

const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);

module.exports = passport.use(new Strategy(jwtOptions, (jwt_payload, done) => {
    User.forge({id: jwt_payload.id})
      .fetch()
      .then(user => {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
      })
      .catch(err => {
        console.log('FAIL');
        return JSON.stringify({message: "Please verify your credentials"})
      })
  }));
