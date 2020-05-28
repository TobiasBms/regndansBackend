require("dotenv").config();
const path = require("path");
module.exports = {
    client: process.env.CLIENT,
    connection: {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
        timezone: "UTC",
        dateStrings: true
    },
    migrations: {
        directory: path.resolve("./src/migrations"),
    },
    seeds: {    
        directory: path.resolve("./src/seeds"),
    },
    debug: true
};
