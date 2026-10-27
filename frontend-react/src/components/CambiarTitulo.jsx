import { useState } from "react";

function CambiarTitulo() {
  const [titulo, setTitulo] = useState("Sistema de Gestión Académica");

  return (
    <>
      <h1>{titulo}</h1>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => setTitulo("Alumnos")}
          style={{ fontSize: "20px", color: "blue", padding: "10px" }}
        >
          Alumnos
        </button>

        <button
          onClick={() => setTitulo("Docentes")}
          style={{ fontSize: "20px", color: "blue", padding: "10px" }}
        >
          Docentes
        </button>
      </div>
    </>
  );
}

export default CambiarTitulo;