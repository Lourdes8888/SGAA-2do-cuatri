const mongoose = require("mongoose") 

const AlumnoSchema = new mongoose.Schema({ 
    dni: {
        type: Number,
        unique: true 
    },
    nombre: String,
    carrera: String,
    correo: String
},
{ 
    versionKey: false 
}
)

const Alumno = mongoose.model("Alumno", AlumnoSchema) 

module.exports = Alumno 