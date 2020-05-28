
exports.up = function(knex) {
  return knex.schema
      .createTable("team", (table) => {
            table.increments().primary();
            table.string("TeamName");
            table.dateTime("createdAt");
            table.dateTime("updatedAt");
      });
};

exports.down = function(knex) {
  return knex.schema.dropTable("team");
};
