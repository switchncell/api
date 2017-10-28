const Bookshelf = require('../config/bookshelf');
import bcrypt from 'bcrypt';

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = Bookshelf.model('User', User);
