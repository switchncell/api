import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import User from '../models/User';
// const LocalStrategy = passportLocal.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;

const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

console.log(process.env.JWT_SECRET);    
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const strategy = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: "secret"
// }
//
// const strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
//   console.log('payload received', jwt_payload);
//
//   const user = User.findById(jwt_payload.id).then(user => user);
//   if (user) {
//     next(null, user);
//   } else {
//     next(null, false);
//   }
// });


export default strategy

// const options = {};
//
// function comparePass(userPassword, databasePassword) {
//   return bcrypt.compareSync(userPassword, databasePassword);
// }
//
// init();
//
// passport.use(new LocalStrategy(options, (username, password, done) => {
//   // check to see if the username exists
//   knex('users').where({ username }).first()
//   .then((user) => {
//     if (!user) return done(null, false);
//     if (!authHelpers.comparePass(password, user.password)) {
//       return done(null, false);
//     } else {
//       return done(null, user);
//     }
//   })
//   .catch((err) => { return done(err); });
// }));
//
// module.exports = passport;
