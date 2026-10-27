import { useEffect, useState } from "react"

const API_DOCENTES = "http://localhost:3000/docentes"; 

export function ListaDocente({ actualizar, onDocenteCreado, onEditarDocente }) {
    const [docentes, setDocentes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

async function eliminarDocente(dni) {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este docente?");
    if (!confirmar) return;
    
    
try {
        const respuesta = await fetch(`${API_DOCENTES}/${dni}`, {
            method: "DELETE"
        });

if (!respuesta.ok) {
            throw new Error("Error al eliminar el docente. Estado HTTP: " + respuesta.status);
        }
        onDocenteCreado(); // Llamar a la función para actualizar la lista de docentes después de eliminar

    } catch (error){
        console.error("Error al eliminar: ", error)
        alert(error.message || "No se pudo eliminar al docente")

   }
}
   


    useEffect(() => {
        async function cargarDocentes() {
            setCargando(true);
            setError("");

            try{
            const respuesta = await fetch(API_DOCENTES);

            if (!respuesta.ok){
                    throw new Error(`No se pudo obtener la lista de docentes. Estado HTTP: ${respuesta.status}`)
            }
            const datos = await respuesta.json();
            setDocentes(datos);
        } catch(error){
            console.error("error de conexion", error)
            setError(error.message || "No se pudo cargar la lista de docentes");
        } finally {
            setCargando(false);
        }
    }

        cargarDocentes();
    }, [actualizar]);

    if (cargando) {
        return <p>Cargando docentes...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <section>
            <h2>Docentes</h2>
            {docentes.length === 0 ? (
                <p>No hay docentes registrados.</p>
            ) : (

                <ul className="student-list" style={{ listStyleType: "none", padding: 0 }}>
                    {docentes.map(docente => (
                        <li className="student-row" key={docente.dni}>
                            <strong>{docente.nombre}</strong>
                            <span>{docente.dni}</span>
                            <span>{docente.especialidad}</span>
                            <span>
                                {docente.correo}
                                <button
                                    type="button"
                                    onClick={() => onEditarDocente(docente)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => eliminarDocente(docente.dni)}
                                    aria-label={`Eliminar a ${docente.nombre}`}
                                >
                                    Eliminar
                                </button>
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
        
    );
}