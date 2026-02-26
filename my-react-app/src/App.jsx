import { useState } from "react";
import Encabezado from "./encabezado";
import ContenedorTarjeta from "./ContenedorTarjeta";
import PromosContenido from "./PromosContenido";
import MapaGeneralXicotepec from "./MapaGeneralXicotepec";
import PieComponente from "./PieComponente";
import "./Carrito.css";
import "./Inicio.css";
import "./AcercaDe.css";
import "./Productos.css";
import "./Galeria.css";
import "./Videos.css";
import "./Contacto.css";
import "./Sucursales.css";
import inicio from "./Inicio";
import acerca from "./AcercaDe";
import galeria from "./Galeria";
import videos from "./Videos";
import contacto from "./Contacto";
import sucursales from "./Sucursales";

const Fondo = "https://images2.alphacoders.com/132/1329303.jpeg";

function App() {
  const [seccion, setSeccion] = useState("inicio");

  const contenido = {
    inicio,
    acerca,
    productos: [],
    galeria,
    videos,
    contacto,
    usuarios: [],
    carrito: [],
    sucursales
  };

  return (
    <div className="app-shell">
      <Encabezado seccionActiva={seccion} setSeccion={setSeccion} />

      <main className="app-main">
        <ContenedorTarjeta seccion={seccion} contenido={contenido} />

        {seccion === "inicio" && <PromosContenido fondo={Fondo} />}
        {seccion === "inicio" && <MapaGeneralXicotepec />}
      </main>

      <button
        type="button"
        className={`carrito-fab ${seccion === "carrito" ? "activo" : ""}`}
        onClick={() => setSeccion("carrito")}
        aria-label="Abrir carrito"
        title="Carrito"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM6.2 6l.94 2h9.72c.75 0 1.41.41 1.75 1.03.34.62.31 1.38-.08 1.98l-2.74 4.97a2.004 2.004 0 0 1-1.75 1.02H8a2 2 0 0 1-1.88-1.34L3.26 4H1V2h3.59c.43 0 .81.27.95.67L6.2 6z" />
        </svg>
      </button>

      <PieComponente />
    </div>
  );
}

export default App;
