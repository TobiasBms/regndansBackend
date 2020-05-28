exports.up = function (knex) {
   return knex.schema.table("board", table => {
        table.string('boardDescription');
        table.text('boardInputs');
    })
};

exports.down = function (knex) {
   return knex.schema.table("board", table => {
        table.dropColumn('boardDescription');
        table.dropColumn('boardInputs');
    })
};
