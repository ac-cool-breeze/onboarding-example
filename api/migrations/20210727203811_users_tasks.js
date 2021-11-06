
exports.up = function(knex) {
  return knex.schema.createTable('users_taskers', table => {
    table.increments('id').primary();
    table.integer('user_id');
    table.integer('taskers_id');
    table.string('is_complete');
    table.string('due_date');
    table.string('start_date');
    table.string('completed_date');
    table.boolean('archived').defaultTo(false);
})};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_taskers');
};