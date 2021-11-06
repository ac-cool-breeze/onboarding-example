
exports.up = function(knex) {
  return knex.schema.createTable('groups', table => {
    table.increments('id').primary();
    table.string('name');
    table.boolean('archived');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('groups');
};
