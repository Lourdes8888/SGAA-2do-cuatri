const mongoose = require("mongoose");

async function conectarBD() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/SGA");
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error.message);
  }
}

module.exports = conectarBD;