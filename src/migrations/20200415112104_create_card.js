
exports.up = function(knex) {
  return knex.schema.createTable("card", table => {
    table.increments("cardId").primary();
    table.string("cardName", 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("card");
};
