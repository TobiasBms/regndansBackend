exports.up = function (knex) {
  return knex.schema.createTable("board_has_user", table => {
    table.integer("userId").unsigned();
    table.foreign("userId").references("users.userId").onDelete('CASCADE');
    table.integer("boardId").unsigned();
    table.foreign("boardId").references("board.boardId").onDelete('CASCADE');
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable("board_has_user");
};
