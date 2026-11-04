const Materia = require("../models/Materias");

function validarDatosMateria(data = {}) {
  const {
    codigo,
    nombre,
    descripcion,
    cargaHoraria,
    estado
  } = data;

  if (codigo === undefined || codigo === null || String(codigo).trim() === "") {
    return "El código es obligatorio.";
  }

  if (typeof codigo !== "string" || codigo !== codigo.trim()) {
    return "El código no puede tener espacios al comienzo o al final.";
  }

  if (nombre === undefined || nombre === null || String(nombre).trim() === "") {
    return "El nombre es obligatorio.";
  }

  if (descripcion !== undefined && descripcion !== null && typeof descripcion !== "string") {
    return "La descripción debe ser un texto.";
  }

  if (descripcion !== undefined && descripcion !== null && descripcion.trim() === "" && descripcion !== "") {
    return "La descripción no puede contener solo espacios.";
  }

  if (cargaHoraria === undefined || cargaHoraria === null || cargaHoraria === "") {
    return "La carga horaria es obligatoria.";
  }

  const carga = Number(cargaHoraria);

  if (!Number.isInteger(carga) || carga <= 0) {
    return "La carga horaria debe ser un número entero mayor que cero.";
  }

  if (!["activa", "inactiva"].includes(estado)) {
    return "El estado debe ser activa o inactiva.";
  }

  return null;
}

async function obtenerMaterias(req, res) {
  try {
    const materias = await Materia.find().sort({ nombre: 1 });
    res.json(materias);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No se pudieron obtener las materias."
    });
  }
}

async function obtenerMateria(req, res) {
  try {
    const { codigo } = req.params;
    const materia = await Materia.findOne({ codigo });

    if (!materia) {
      return res.status(404).json({
        mensaje: "Materia no encontrada."
      });
    }

    res.json(materia);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No se pudo consultar la materia."
    });
  }
}

async function crearMateria(req, res) {
  try {
    const cuerpo = req.body || {};
    const errorValidacion = validarDatosMateria(cuerpo);

    if (errorValidacion) {
      return res.status(400).json({
        mensaje: errorValidacion
      });
    }

    const codigo = String(cuerpo.codigo).trim();
    const nombre = String(cuerpo.nombre).trim();
    const descripcion = cuerpo.descripcion === undefined ? "" : String(cuerpo.descripcion).trim();
    const cargaHoraria = Number(cuerpo.cargaHoraria);
    const estado = cuerpo.estado;

    const existe = await Materia.findOne({ codigo });

    if (existe) {
      return res.status(409).json({
        mensaje: "Ya existe una materia con ese código."
      });
    }

    const nuevaMateria = await Materia.create({
      codigo,
      nombre,
      descripcion,
      cargaHoraria,
      estado
    });

    res.status(201).json(nuevaMateria);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe una materia con ese código."
      });
    }

    res.status(400).json({
      mensaje: "No se pudo registrar la materia."
    });
  }
}

async function actualizarMateria(req, res) {
  try {
    const { codigo: codigoOriginal } = req.params;
    const cuerpo = req.body || {};
    const materiaExistente = await Materia.findOne({ codigo: codigoOriginal });

    if (!materiaExistente) {
      return res.status(404).json({
        mensaje: "Materia no encontrada."
      });
    }

    const codigoNuevo = cuerpo.codigo !== undefined ? String(cuerpo.codigo).trim() : codigoOriginal;
    const nombre = cuerpo.nombre !== undefined ? String(cuerpo.nombre).trim() : undefined;
    const descripcion = cuerpo.descripcion !== undefined ? String(cuerpo.descripcion).trim() : undefined;
    const cargaHoraria = cuerpo.cargaHoraria !== undefined ? Number(cuerpo.cargaHoraria) : undefined;
    const estado = cuerpo.estado !== undefined ? cuerpo.estado : undefined;

    if (codigoNuevo === "") {
      return res.status(400).json({
        mensaje: "El código no puede estar vacío."
      });
    }

    if (codigoNuevo !== codigoOriginal) {
      const existeCodigo = await Materia.findOne({ codigo: codigoNuevo });
      if (existeCodigo) {
        return res.status(409).json({
          mensaje: "El código ya está en uso por otra materia."
        });
      }
    }

    const datosActualizados = {
      ...(cuerpo.codigo !== undefined ? { codigo: codigoNuevo } : {}),
      ...(cuerpo.nombre !== undefined ? { nombre } : {}),
      ...(cuerpo.descripcion !== undefined ? { descripcion } : {}),
      ...(cuerpo.cargaHoraria !== undefined ? { cargaHoraria } : {}),
      ...(cuerpo.estado !== undefined ? { estado } : {})
    };

    const validacion = validarDatosMateria({
      codigo: datosActualizados.codigo ?? materiaExistente.codigo,
      nombre: datosActualizados.nombre ?? materiaExistente.nombre,
      descripcion: datosActualizados.descripcion ?? materiaExistente.descripcion,
      cargaHoraria: datosActualizados.cargaHoraria ?? materiaExistente.cargaHoraria,
      estado: datosActualizados.estado ?? materiaExistente.estado
    });

    if (validacion) {
      return res.status(400).json({
        mensaje: validacion
      });
    }

    const materiaActualizada = await Materia.findOneAndUpdate(
      { codigo: codigoOriginal },
      datosActualizados,
      {
        new: true,
        runValidators: true
      }
    );

    if (!materiaActualizada) {
      return res.status(404).json({
        mensaje: "Materia no encontrada."
      });
    }

    res.json(materiaActualizada);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: "Ya existe una materia con ese código."
      });
    }

    res.status(400).json({
      mensaje: "No se pudo actualizar la materia."
    });
  }
}

async function eliminarMateria(req, res) {
  try {
    const { codigo } = req.params;
    const materia = await Materia.findOneAndDelete({ codigo });

    if (!materia) {
      return res.status(404).json({
        mensaje: "Materia no encontrada."
      });
    }

    res.json({
      mensaje: "Materia eliminada correctamente."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "No se pudo eliminar la materia."
    });
  }
}

module.exports = {
  obtenerMaterias,
  obtenerMateria,
  crearMateria,
  actualizarMateria,
  eliminarMateria
};