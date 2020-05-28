
exports.up = function(knex) {
  return knex.schema.createTable("cardType", table => {
      table.increments("cardTypeId").primary();
      table.string('cardType', 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("cardType");
};
