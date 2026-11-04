const mongoose = require("mongoose");

async function conectarBD() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/SGA");
  console.log("Base de datos conectada");
}

module.exports = conectarBD;