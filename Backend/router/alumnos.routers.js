const express = require("express")
// const alumnosController = require("../controllers/alumnos.controller")
const { obtenerAlumnos, obtenerAlumno, crearAlumno, actualizarAlumno, eliminarAlumno } = require("../controllers/alumnos.controller")
const router = express.Router()
//get, post, put, delete    
router.get("/", obtenerAlumnos)

router.get("/:id", obtenerAlumno)

router.post("/", crearAlumno) //router.post("/", alumnosController.crearAlumno)

router.put("/:id", actualizarAlumno)

router.delete("/:id", eliminarAlumno)

module.exports = router
