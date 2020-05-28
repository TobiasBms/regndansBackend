exports.up = function(knex) {
  return knex.schema.createTable("boardRole", table => {
    table.increments("roleId").primary();
    table.enu("TeamRole", ["Admin", "User", "Guest"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("boardRole");
};