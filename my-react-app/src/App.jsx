import { useState } from "react";
import Encabezado from "./encabezado";
import ContenedorTarjeta from "./ContenedorTarjeta";
import PromosContenido from "./PromosContenido";
import PieComponente from "./PieComponente";
import "./Inicio.css";
import "./AcercaDe.css";
import "./Productos.css";
import "./Galeria.css";
import "./Videos.css";
import "./Contacto.css";
import "./Sucursales.css";
import inicio from "./Inicio";
import acerca from "./AcercaDe";
import productos from "./Productos";
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
    productos,
    galeria,
    videos,
    contacto,
    usuarios: [],
    sucursales
  };

  return (
    <div className="app-shell">
      <Encabezado seccionActiva={seccion} setSeccion={setSeccion} />

      <main className="app-main">
        <ContenedorTarjeta seccion={seccion} contenido={contenido} />

        {seccion === "inicio" && <PromosContenido fondo={Fondo} />}
      </main>

      <PieComponente />
    </div>
  );
}

export default App;
