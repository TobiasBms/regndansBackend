require("dotenv").config();
const config = require("../knexfile");
const knex = require("knex")(config);
const {Model} = require("objection");
const PORT = process.env.PORT;
const express = require("express");
const app = require("express")();
const server = require("http").Server(app);
const bodyParser = require("body-parser");
const users = require("./routes/users");
const auth = require("./routes/auth");
const draw = require("./routes/draw");
const cors = require("cors");
const {init} = require('./socket');
const board = require('./routes/board');
//const section  = require('./routes/section');
if (!process.env.jwtPrivate) {
  console.log('FATAL ERROR: jwtPrivateKey is not defined.')
  process.exit(1);
}

const files = require("./routes/fileUpload");
//Instancing the model with the knex sql.
Model.knex(knex);

server.listen(PORT);

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('src/assets'));
app.use('/api/draw', draw);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/uploads', files);
app.use('/api/board', board);
//app.use('/api/section', section);
//Socket initialized
init(server);
