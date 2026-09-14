const express = require("express");
const conectarBD = require("./config/database");
const alumnosRoutes = require("./alumnos.routers");
const connect = require("./config/database");
require("dotenv").config();
const PORT = process.env.PORT
conectarBD()


const app = express();
app.use(express.json());

conectarBD();

app.use("/alumnos", alumnosRoutes);

app.use((req, res, next) => {
  console.log(req.method);
  console.log(req.url);
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});