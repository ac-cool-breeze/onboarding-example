
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('user_name').unique();
    table.string('password');
    table.integer('roles_id');
    table.integer('group_id')
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
