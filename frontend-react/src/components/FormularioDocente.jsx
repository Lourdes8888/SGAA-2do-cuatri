import { useState } from "react";
const API_DOCENTES = "http://localhost:3000/docentes"


function FormularioDocente({ onDocenteCreado, docenteEditar, onCancelar }){
    const [formulario, setFormulario] = useState({
        dni: String(docenteEditar?.dni ?? ""),
        nombre: docenteEditar?.nombre ?? "",
        especialidad: docenteEditar?.especialidad ?? "",
        correo: docenteEditar?.correo ?? ""
    })
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)


    function manejarCambio(e) {
        const { name, value} = e.target

        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    async function guardar(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)
        
    const docente = {
        ...formulario,
        dni: Number(formulario.dni)
    }
    const editando = Boolean(docenteEditar)
    const url = editando 
                ? `${API_DOCENTES}/${docenteEditar.dni}`
                : API_DOCENTES
        try {
            const respuesta = await fetch(url, {
                method: editando ? "PUT" : "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(docente)
            })

            if (!respuesta.ok) {
                throw new Error(`No se pudo guardar el docente. Estado HTTP: ${respuesta.status}`)
            }

            setFormulario({
                dni: "",
                nombre: "",
                especialidad: "",
                correo: ""
            })
            onDocenteCreado()
        } catch (error) {
            console.error("Error al guardar:", error)
            setError(error.message || "No se pudo conectar con el servidor")
        } finally {
            setGuardando(false)
        }
    }
    function cancelar(){
        onCancelar()
    }
    return(
        <>
        <h2>{docenteEditar ? "Editar docente" : "Nuevo Docente"}</h2>
        <form className="student-form" onSubmit={guardar}>
            <label htmlFor="dni">DNI</label>
            <input
            id="dni"
            name="dni"
            type="number"
            min="1"
            step="1"
            value={formulario.dni}
            onChange={manejarCambio}
            required
            />
            <label htmlFor="nombre">Nombre</label>
            <input
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            onChange={manejarCambio}
            required
            />
            <label htmlFor="especialidad">Especialidad</label>
            <input
            id="especialidad"
            name="especialidad"
            value={formulario.especialidad}
            onChange={manejarCambio}
            required
            />
            <label htmlFor="correo">Correo</label>
            <input
            id="correo"
            name="correo"
            type="email"
            value={formulario.correo}
            onChange={manejarCambio}
            required
            />
            <button type="submit" disabled={guardando}>
                {guardando 
                ? "Guardando..." 
                : docenteEditar 
                    ? "Guardar cambios"
                    : "Guardar"}
            </button>
            {docenteEditar && (
                <button
                type="button"
                onClick={cancelar}
                disabled={guardando}
                >
                    Cancelar
                </button>
            )}
            {error && <p className="form-message is-error" role="alert">{error}</p>}
        </form>
        </>
    )
}
export default FormularioDocente