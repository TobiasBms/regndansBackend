exports.up = function (knex) {
    return knex.schema.createTable("users", table => {
        table.increments("userId").primary();
        table.string("username");
        table.string("email");
        table.string("imageUrl");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users");
};

