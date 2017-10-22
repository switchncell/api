import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import passport from 'passport';
import passportLocal from 'passport-local';
import jwt from 'jsonwebtoken';
import passportJWT from 'passport-jwt'
// import strategy from './config/auth';
// const LocalStrategy = passportLocal.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
import util from 'util';
import bcrypt from 'bcryptjs';
const promisify = util.promisify
const salt = bcrypt.genSaltSync();

const router = express.Router()


// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  console.log(req.headers);
  const token = req.headers.authorization
  console.log(token);

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'secret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


router.get("/auth/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  console.log(req);
  res.json("Success! You can not see this without a token");
});
export default router
