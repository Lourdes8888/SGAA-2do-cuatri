function TarjetaAlumno({ nombre, carrera, edad, correo }) {
    return (
        <article>
            <h2>{nombre}</h2>
            <p>{carrera}</p>
            <p>Edad:{edad}</p>
            <p>{correo}</p> 

        </article>
    )
}
export default TarjetaAlumno
