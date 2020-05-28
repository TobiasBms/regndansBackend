
exports.up = function(knex) {
  return knex.schema.createTable("section", table => {
    table.increments("sectionId").primary();
    table.string("sectionName", 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("section");
};