
exports.up = function (knex) {
  return knex.schema.createTable('taskers', table => {
    table.increments('id').primary();
    table.string('task_name');
    table.string('task_description');
    table.integer('time_to_complete');
    table.integer('group_id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('taskers');
};
