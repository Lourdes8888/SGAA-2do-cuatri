const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Usuario = require("./models/Usuario");

async function crearUsuario() {
    const nombre = process.env.ADMIN_NAME?.trim();
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!nombre || !email || !password) {
        throw new Error("Definí ADMIN_NAME, ADMIN_EMAIL y ADMIN_PASSWORD en Backend/.env.");
    }

    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/SGA");
    const passwordHash = await bcrypt.hash(password, 10);

    await Usuario.findOneAndUpdate(
        { email },
        { nombre, email, password: passwordHash, rol: "admin" },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    console.log("Usuario administrador creado o actualizado:", email);
}

crearUsuario()
    .catch((error) => {
        console.error("Error al crear el usuario:", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }
    });
