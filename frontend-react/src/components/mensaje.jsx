import {useState} from "react";
function Mensaje(){
    const [mensaje, setMensaje] = useState("Hola Alumno")

    function cambiarMensaje(){
        setMensaje("Bienvenido a programacion IV")

};

return (
    <>
    <h2>{mensaje}</h2>
    <button onClick={cambiar Mensaje}>Cambiar Mensaje</button>
    </>
    )

}
