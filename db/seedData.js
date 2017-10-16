import faker from 'faker';

const Users = Array.from(Array(20))
  .map(() =>
    Object.assign({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    }))

export default Users
