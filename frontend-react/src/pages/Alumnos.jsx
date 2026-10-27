import { useState } from "react"
import FormularioA from "../components/FormularioA"
import { ListaAlumno } from "../components/ListaAlumno"

export default function Alumnos() {
  const [actualizar, setActualizar] = useState(0)
  const [alumnoEditar, setAlumnoEditar] = useState(null)

  function alumnoCreado() {
    setActualizar(valor => valor + 1)
    setAlumnoEditar(null)
  }

  function seleccionarAlumno(alumno) {
    setAlumnoEditar(alumno)
  }

  return (
    <>
      <section className="student-section" id="formulario">
        <FormularioA
          key={alumnoEditar?.legajo ?? "nuevo"}
          onAlumnoCreado={alumnoCreado}
          alumnoEditar={alumnoEditar}
          onCancelar={() => setAlumnoEditar(null)}
        />
      </section>
      <section className="student-section" id="alumnos">
        <ListaAlumno
          actualizar={actualizar}
          onAlumnoCreado={alumnoCreado}
          onEditarAlumno={seleccionarAlumno}
        />
      </section>
    </>
  )
}