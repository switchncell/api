import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import User from '../models/User';
import passport from'../config/passport';
import util from 'util';
const router = express.Router();
const salt = bcrypt.genSaltSync();
const knex = require('knex')(require('../config/knexfile')[process.env.NODE_ENV]);

const comparePassword = (passw, password, cb) => {
  bcrypt.compare(passw, password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  })
}

router.post('/signup', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  }
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
    email: req.body.email,
    first_name: req.body.firstName,
    last_name: req.body.lastName
  })
  .then(data => {
    res.status(201).json({
      success: true,
      msg: 'Successful created new user.'
    });
  }).catch(err => {
    return res.json({
      success: false,
      msg: 'Username already exists.'
    });
  })
})

router.post('/login', async (req, res) => {
  const compare = util.promisify(comparePassword)
    try {
      const user = await User.forge({email: req.body.email}).fetch()
      const passwordMatch = await compare(req.body.password, user.attributes.password)
      if(passwordMatch){
        const payload = {id: user.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.status(200).json({success: true, token: token});
      } else {
        res.status(401).json({success: false, msg: 'Authentication failed. Wrong password.'});
      }

    } catch (error) {
      res.status(401).json({message: 'something went wrong please verify your username and password', error: error.message})
    }
})

router.get('/secret',
  passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({success: true, msg: 'success  yo!'});
  }
);

export default router
