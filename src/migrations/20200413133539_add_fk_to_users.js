
exports.up = function(knex) {
  return knex.schema.table("users", table => {
    table.integer('roleId').unsigned()
    table.foreign("roleId").references("boardRole.roleId");
  })
};

exports.down = function(knex) {
  return knex.schema.table("users", table => {
    table.dropForeign("roleId");
    table.dropColumn("roleId");
  } );
};
