import passport from 'passport'
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV]);


module.exports = () => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    knex('users').where({id}).first()
      .then((user) => { done(null, user); })
      .catch((err) => { done(err,null); });
  });

};
