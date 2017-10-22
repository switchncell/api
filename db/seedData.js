import faker from 'faker';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync();
const hash = bcrypt.hashSync('password', salt);

const Users = Array.from(Array(20))
  .map(() =>
    Object.assign({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: hash
    }))

export default Users;
