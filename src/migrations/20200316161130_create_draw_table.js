
exports.up = function(knex) {
  return knex
         .schema
         .createTable("draw", table => {
          table.increments("drawId").primary();
          table.string("drawJson");
          table.datetime("createAt");
          table.datetime("updatedAt");
         });
         
};

exports.down = function(knex) {
    return knex.schema.dropTable("draw");
};
