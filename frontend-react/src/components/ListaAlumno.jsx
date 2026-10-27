import { useEffect, useState } from "react";
const API_ALUMNOS = "http://localhost:3000/alumnos"; 

export function ListaAlumno({ actualizar, onAlumnoCreado, onEditarAlumno }) {
    const [alumnos, setAlumnos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

async function eliminarAlumno(legajo) {
    const confirmar = window.confirm("¿Estás seguro de que quieres eliminar este alumno?");
    if (!confirmar) return;
    
    
try {
        const respuesta = await fetch(`${API_ALUMNOS}/${legajo}`, {
            method: "DELETE"
        });

if (!respuesta.ok) {
            throw new Error("Error al eliminar el alumno. Estado HTTP: " + respuesta.status);
        }
        onAlumnoCreado(); // Llamar a la función para actualizar la lista de alumnos después de eliminar

    } catch (error){
        console.error("Error al eliminar: ", error)
        alert(error.message || "No se pudo eliminar al alumno")

   }
}
   


    useEffect(() => {
        async function cargarAlumnos() {
            setCargando(true);
            setError("");

            try{
            const respuesta = await fetch(API_ALUMNOS);

            if (!respuesta.ok){
                    throw new Error(`No se pudo obtener la lista de alumnos. Estado HTTP: ${respuesta.status}`)
            }
            const datos = await respuesta.json();
            setAlumnos(datos);
        } catch(error){
            console.error("error de conexion", error)
            setError(error.message || "No se pudo cargar la lista de alumnos");
        } finally {
            setCargando(false);
        }
    }

        cargarAlumnos();
    }, [actualizar]);

    if (cargando) {
        return <p>Cargando alumnos...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    return (
        <section>
            <h2>Alumnos</h2>
            {alumnos.length === 0 ? (
                <p>No hay alumnos registrados.</p>
            ) : (

                <ul className="student-list" style={{ listStyleType: "none", padding: 0 }}>
                    {alumnos.map(alumno => (
                        <li className="student-row" key={alumno.legajo}>
                            <strong>{alumno.nombre}</strong>
                            <span>{alumno.legajo}</span>
                            <span>{alumno.carrera}</span>
                            <span>
                                {alumno.correo}
                                <button
                                    type="button"
                                    onClick={() => onEditarAlumno(alumno)}
                                >
                                    Editar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => eliminarAlumno(alumno.legajo)}
                                    aria-label={`Eliminar a ${alumno.nombre}`}
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