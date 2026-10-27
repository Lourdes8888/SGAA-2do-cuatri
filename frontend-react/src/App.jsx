import Alumnos from "./pages/Alumnos"
import Docentes from "./pages/Docentes"
import FAQ from "./pages/FAQ"
import Inicio from "./pages/Inicio"
import LayoutPpal from "./layouts/LayoutPpal"

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/"

  let page
  switch (path) {
    case "/":
      page = <Inicio />
      break
    case "/alumnos":
      page = <Alumnos />
      break
    case "/docentes":
      page = <Docentes />
      break
    case "/ayuda":
      page = <FAQ />
      break
    default:
      page = (
        <section className="student-section">
          <h1>Página no encontrada</h1>
          <p>La dirección solicitada no existe.</p>
        </section>
      )
  }

  return <LayoutPpal>{page}</LayoutPpal>
}

export default App
