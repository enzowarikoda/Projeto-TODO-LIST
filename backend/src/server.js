import express from "express";
import app from "./app.js";
import Todos from "./models/Todos.js";
import Sequelize from "sequelize";
import config from "./config/database.js";
import todosRouter from "./router.js"

const port = 3000;

app.use('/todos', todosRouter)

const sequelize = new Sequelize(config);
Todos.init(sequelize);

sequelize.authenticate().then( () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}).catch( err => {
  console.error(err);
})
