import { ListaDocente } from "../components/ListaDocente"
import { useState } from "react"
import FormularioDocente from "../components/FormularioDocente"

export default function Docentes() {
  const [actualizar, setActualizar] = useState(0)
  const [docenteEditar, setDocenteEditar] = useState(null)

  function docenteCreado() {
    setActualizar(valor => valor + 1)
    setDocenteEditar(null)
  }

  function seleccionarDocente(docente) {
    setDocenteEditar(docente)
  }

  return (
    <>
      <section className="student-section" id="formulario">
        <FormularioDocente
          key={docenteEditar?.dni ?? "nuevo"}
          onDocenteCreado={docenteCreado}
          docenteEditar={docenteEditar}
          onCancelar={() => setDocenteEditar(null)}
        />
      </section>
      <section className="student-section" id="docentes">
        <ListaDocente
          actualizar={actualizar}
          onDocenteCreado={docenteCreado}
          onEditarDocente={seleccionarDocente}
        />
      </section>
    </>
  )
}