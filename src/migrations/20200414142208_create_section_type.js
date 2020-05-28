
exports.up = function(knex) {
  return knex.schema.createTable("sectionType", table => {
    table.increments("sectionTypeId").primary();
    table.string("sectionTypeName");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("sectionType");
};
