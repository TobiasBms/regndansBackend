
exports.up = function(knex) {
    return knex.schema.table("card", table => {
        table.integer("cardTypeId").unsigned();
        table.foreign("cardTypeId").references("cardType.cardTypeId");
        table.integer("sectionId").unsigned();
        table.foreign("sectionId").references("section.sectionId");
    });
};

exports.down = function(knex) {
  return knex.schema.table("card", table => {
    table.dropForeign("cardTypeId", "card_cardtypeid_foreign");
    table.dropColumns("cardTypeId");
    table.dropForeign("sectionId", "card_sectionid_foreign");
    table.dropColumns("sectionId");

  });
};
