const Alumno = require("../models/alumno");

async function obtenerAlumnos(req, res) {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alumnos", error: error.message });
  }
}

async function obtenerAlumno(req, res) {
  try {
    const alumno = await Alumno.findOne({ legajo: Number(req.params.id) });
    if (!alumno) {
      return res.status(404).json({ mensaje: "Alumno no encontrado" });
    }
    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener alumno", error: error.message });
  }
}

async function crearAlumno(req, res) {
  const { legajo, nombre, carrera, correo } = req.body;

  if (!legajo || !nombre || !carrera || !correo) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre debe ser un texto válido" });
  }

  if (typeof carrera !== "string" || carrera.trim() === "") {
    return res.status(400).json({ mensaje: "La carrera debe ser un texto válido" });
  }

  if (typeof correo !== "string" || !/^\S+@\S+\.\S+$/.test(correo.trim())) {
    return res.status(400).json({ mensaje: "El correo no es válido" });
  }

  const legajoNumero = Number(legajo);
  if (!Number.isInteger(legajoNumero) || legajoNumero <= 0) {
    return res.status(400).json({ mensaje: "El legajo debe ser un número entero válido" });
  }

  const existe = await Alumno.findOne({ legajo: legajoNumero });
  if (existe) {
    return res.status(400).json({ mensaje: "Ya existe un alumno con ese legajo" });
  }

  try {
    const nuevoAlumno = await Alumno.create({
      legajo: legajoNumero,
      nombre: nombre.trim(),
      carrera: carrera.trim(),
      correo: correo.trim(),
    });
    res.status(201).json(nuevoAlumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear alumno", error: error.message });
  }
}

async function actualizarAlumno(req, res) {
  const { nombre, carrera, correo } = req.body;

  if (!nombre || !carrera || !correo) {
    return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
  }

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre debe ser un texto válido" });
  }

  if (typeof carrera !== "string" || carrera.trim() === "") {
    return res.status(400).json({ mensaje: "La carrera debe ser un texto válido" });
  }

  if (typeof correo !== "string" || !/^\S+@\S+\.\S+$/.test(correo.trim())) {
    return res.status(400).json({ mensaje: "El correo no es válido" });
  }

  try {
    const alumno = await Alumno.findOneAndUpdate(
      { legajo: Number(req.params.id) },
      {
        nombre: nombre.trim(),
        carrera: carrera.trim(),
        correo: correo.trim(),
      },
      { new: true }
    );

    if (!alumno) {
      return res.status(404).json({ mensaje: "Alumno no encontrado" });
    }

    res.json(alumno);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar alumno", error: error.message });
  }
}

async function eliminarAlumno(req, res) {
  try {
    const alumno = await Alumno.findOneAndDelete({ legajo: Number(req.params.id) });
    if (!alumno) {
      return res.status(404).json({ mensaje: "Alumno no encontrado" });
    }

    res.json({ mensaje: "Alumno eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar alumno", error: error.message });
  }
}

module.exports = {
  obtenerAlumnos,
  obtenerAlumno,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno,
};