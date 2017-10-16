exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('users', table => {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users')
  ]);
};
