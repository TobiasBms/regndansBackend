
exports.up = function(knex) {
    return knex.schema.createTable("helper", table => {
      table.increments("helperId").primary();
      table.integer("videoId").unique().notNullable();
      table.string("paragraph");
      table.string("videoName");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("helper");
};
