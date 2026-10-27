import SelectorTema from "./SelectorTema";

export default function Header() {
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";

    return (
        <header className="student-header">
            <a className="student-brand" href="/" aria-label="SGA - Inicio">
                <img className="student-logo" src="/sga.svg" alt="" />
                <span className="student-brand-copy">
                    <span className="student-eyebrow">Sistema de Gestión Académica</span>
                    <span className="student-brand-title">SGA</span>
                </span>
            </a>
            <div className="student-header-actions">
                <nav className="student-nav" aria-label="Navegación principal">
                    <a href="/" aria-current={currentPath === "/" ? "page" : undefined}>Inicio</a>
                    <a href="/alumnos" aria-current={currentPath === "/alumnos" ? "page" : undefined}>Alumnos</a>
                    <a href="/docentes" aria-current={currentPath === "/docentes" ? "page" : undefined}>Docentes</a>
                    <a href="/ayuda" aria-current={currentPath === "/ayuda" ? "page" : undefined}>Ayuda</a>
                </nav>
                <SelectorTema />
            </div>
        </header>
    )
}