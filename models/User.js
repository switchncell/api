const Bookshelf = require('../config/bookshelf');

const User = Bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true
});

module.exports = Bookshelf.model('User', User);
