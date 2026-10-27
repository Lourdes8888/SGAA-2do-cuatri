import { useState } from "react";

function Incrementar() {
  const [contador, setContador] = useState(0);
  const [mostrar, setMostrar] = useState(false);

  function incremento() {
    setContador(contador + 1);
    setMostrar(true);
  }

  function descrementar() {
    if (contador > 0) {
      setContador(contador - 1);
    }
  }

  return (
    <>
      <h1>Contador: {contador}</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <button
          onClick={incremento}
          style={{ backgroundColor: "lightblue", border: "none", padding: "10px", cursor: "pointer" }}
        >
          Incrementar
        </button>
        <br />
        <button
          onClick={descrementar}
          style={{ backgroundColor: "lightcoral", border: "none", padding: "10px", cursor: "pointer" }}
        >
          Descrementar
        </button>
        <br />
      </div>
      <button onClick={() => setMostrar(!mostrar)}>Mostrar/Ocultar</button>
      {mostrar && <p>Información visible</p>}
    </>
  );
}

export default Incrementar;