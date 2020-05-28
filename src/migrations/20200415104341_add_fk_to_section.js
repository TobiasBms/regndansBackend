
exports.up = function(knex) {
    return knex.schema.table("section", table => {
      //Table board
      table.integer("boardId").unsigned();
      table.foreign("boardId").references("boardId").inTable("board");
      //Table section type
      table.integer("sectionTypeId").unsigned();
      table.foreign("sectionTypeId").references("sectionType.sectionTypeId");
      //Table: Helper
      table.integer("helperId").unsigned();
      table.foreign("helperId").references("helper.helperId");

    })
};

exports.down = function(knex) {
    return knex.schema.table("section", table => {
      table.dropForeign("boardId", "section_boardid_foreign");
      table.dropColumns("boardId");
      table.dropForeign("sectionTypeId", "section_sectiontypeid_foreign");
      table.dropColumns("sectionTypeId");
      table.dropForeign("helperId", "section_helperid_foreign");
      table.dropColumns("helperId");
    });
};
