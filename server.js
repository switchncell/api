'use-strict';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt'
import router from './routes/index';
// import strategy from './config/auth';
// const LocalStrategy = passportLocal.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
import util from 'util';
import bcrypt from 'bcryptjs';
const promisify = util.promisify
const salt = bcrypt.genSaltSync();

import User from './models/User'

const PORT = 3001;
const app = express();


app.use(passport.initialize());
const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'secret';

// app.use('/', (req, res, next) => {
  passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  console.log('@@@@@@@@@@')
  console.log('payload received', jwt_payload);

  return User.forge({id: jwt_payload.id})
    .fetch()
    .then(user => {

      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
          // or you could create a new account
      }
    })

}))
// })
app.use('/auth', router)
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// passport.use(strategy)



app.post("/authenticate", (req, res) => {
  User.forge({email: req.body.email})
    .fetch()
    .then(user => {
      bcrypt.compare(req.body.password, user.attributes.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({message:"passwords did not match"})
        }
      const payload = {id: user.id};

      const token = jwt.sign(payload, jwtOptions.secretOrKey, {
        expiresIn: 10000
      });

      res.status(200).json({message: "ok", token: token});
  })
})
  .catch(err => {
     res.status(401).json({message: 'user not found'});
  })
});



// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));

app.listen(PORT, () => {
  console.log('app is listening');
});
