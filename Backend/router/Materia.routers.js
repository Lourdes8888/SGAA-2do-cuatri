const express = require("express");
const {
  obtenerMaterias,
  obtenerMateria,
  crearMateria,
  actualizarMateria,
  eliminarMateria
} = require("../controllers/materias.Controllers");

const router = express.Router();

router.get("/", obtenerMaterias);
router.get("/:codigo", obtenerMateria);
router.post("/", crearMateria);
router.put("/:codigo", actualizarMateria);
router.delete("/:codigo", eliminarMateria);

module.exports = router;