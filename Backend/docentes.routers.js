const express = require("express");
const {
  obtenerDocentes,
  obtenerDocente,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
} = require("./controllers/docentes.controllers");

const router = express.Router();

router.get("/", obtenerDocentes);
router.get("/:id", obtenerDocente);
router.post("/", crearDocente);
router.put("/:id", actualizarDocente);
router.delete("/:id", eliminarDocente);

module.exports = router;
