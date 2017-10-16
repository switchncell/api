require('../config/bookshelf');
const User = require('../models/user');
const Users = require('./seedData');

function deleteAll(model) {
  return model.where('id', '!=', 0).destroy();
}

async function seed() {
  await deleteAll(User);

  const savedUsers = await Promise.all(
    Users.default.map(data =>
      new User(data).save()));

  console.log('data seeded!');
  process.exit(0);
}

try {
  seed();
} catch (err) {
  console.error('ERROR:', err);
  process.exit(1);
}
