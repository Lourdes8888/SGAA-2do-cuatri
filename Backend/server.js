require("dotenv").config()

const express = require("express")
const cors = require("cors")
const conectarDB = require("./config/database")
const alumnosRoutes = require("./router/alumnos.routes")
const docentesRoutes = require("./router/docentes.routers")
const materiasRoutes = require("./router/Materia.routers")
const authRoutes = require("./router/authRouters")

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(cors())
app.use("/alumnos", alumnosRoutes)
app.use("/docentes", docentesRoutes)
app.use("/materias", materiasRoutes)
app.use("/auth", authRoutes)

async function iniciarServidor() {
  try {
    await conectarDB()
    app.listen(PORT, () => {
      console.log(`Servidor funcionando en http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message)
    process.exitCode = 1
  }
}

iniciarServidor()
