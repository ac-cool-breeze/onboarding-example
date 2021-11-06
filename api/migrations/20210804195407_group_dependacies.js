
exports.up = function(knex) {
    return knex.schema.createTable('group_dependacies', table => {
    table.increments('id').primary();
    table.integer('predecessor_group_id');
    table.integer('successor_group_id');
})};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('group_dependacies');
};
