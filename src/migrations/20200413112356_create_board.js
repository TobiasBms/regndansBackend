
exports.up = function(knex) {
  return knex.schema.createTable("board", table => {
    table.increments("boardId").primary();
    table.string("boardName");
    table.string("token").notNullable();
    table.dateTime("createdAt");
    table.dateTime("updatedAt");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("board");
};
