import { useState } from "react";
import Encabezado from "./encabezado";
import Tarjeta from "./Tarjeta";
import PieComponente from "./PieComponente";"./PieComponente";
import "./App.css";

// IMÁGENES ACTUALES
import Estrellas from "./assets/Tarjetas/Estrellas.png";
import Krampus from "./assets/Tarjetas/Krampus.png";
import SDV from "./assets/Tarjetas/SDV.png";
import Seccion6 from "./assets/Tarjetas/Seccion6.png";
import Fondo from "./assets/Tarjetas/Fondo.jpg";

function App() {

  // SECCIÓN ACTIVA
  const [seccion, setSeccion] = useState("inicio");

  // CONTENIDO POR SECCIÓN
  const contenido = {
    inicio: [
      { img: "https://ih1.redbubble.net/image.5779472775.5983/flat,750x,075,f-pad,750x1000,f8f8f8.jpg", titulo: "Texto 1", texto: "Contenido de inicio 1" },
      { img: "https://static.wikia.nocookie.net/zenless-zone-zero/images/b/b5/Faction_Krampus_Compliance_Authority_Icon.png/revision/latest?cb=20251126110143", titulo: "Texto 2", texto: "Contenido de inicio 2" },
      { img: "https://ih1.redbubble.net/image.5591849458.1809/flat,750x1000,075,t.jpg", titulo: "Texto 3", texto: "Contenido de inicio 3" },
      { img: "https://ih1.redbubble.net/image.5593131857.1264/flat,750x,075,f-pad,750x1000,f8f8f8.jpg", titulo: "Texto 4", texto: "Contenido de inicio 4" }
    ],

    acerca: [
      { img: Estrellas, titulo: "Acerca 1", texto: "Información acerca 1" },
      { img: Krampus, titulo: "Acerca 2", texto: "Información acerca 2" },
      { img: SDV, titulo: "Acerca 3", texto: "Información acerca 3" },
      { img: Seccion6, titulo: "Acerca 4", texto: "Información acerca 4" }
    ],

    productos: [
      { img: Estrellas, titulo: "Producto 1", texto: "Descripción producto 1" },
      { img: Krampus, titulo: "Producto 2", texto: "Descripción producto 2" },
      { img: SDV, titulo: "Producto 3", texto: "Descripción producto 3" },
      { img: Seccion6, titulo: "Producto 4", texto: "Descripción producto 4" }
    ],

    galeria: [
      { img: Estrellas, titulo: "Galería 1", texto: "Imagen galería 1" },
      { img: Krampus, titulo: "Galería 2", texto: "Imagen galería 2" },
      { img: SDV, titulo: "Galería 3", texto: "Imagen galería 3" },
      { img: Seccion6, titulo: "Galería 4", texto: "Imagen galería 4" }
    ],

    videos: [
      { img: Estrellas, titulo: "Video 1", texto: "Video destacado 1" },
      { img: Krampus, titulo: "Video 2", texto: "Video destacado 2" },
      { img: SDV, titulo: "Video 3", texto: "Video destacado 3" },
      { img: Seccion6, titulo: "Video 4", texto: "Video destacado 4" }
    ],

    contacto: [
      { img: Estrellas, titulo: "Contacto 1", texto: "Forma de contacto 1" },
      { img: Krampus, titulo: "Contacto 2", texto: "Forma de contacto 2" },
      { img: SDV, titulo: "Contacto 3", texto: "Forma de contacto 3" },
      { img: Seccion6, titulo: "Contacto 4", texto: "Forma de contacto 4" }
    ],

    sucursales: [
      { img: Estrellas, titulo: "Sucursal 1", texto: "Sucursal info 1" },
      { img: Krampus, titulo: "Sucursal 2", texto: "Sucursal info 2" },
      { img: SDV, titulo: "Sucursal 3", texto: "Sucursal info 3" },
      { img: Seccion6, titulo: "Sucursal 4", texto: "Sucursal info 4" }
    ]
  };

  return (
    <>
      <Encabezado setSeccion={setSeccion} />

      {/* TARJETAS — SIEMPRE EXISTEN */}
      <div className="contenedor-tarjetas">
        {contenido[seccion].map((item, index) => (
          <Tarjeta
            key={index}
            imagen={item.img}
            titulo={item.titulo}
            texto={item.texto}
          />
        ))}
      </div>

      {/* FONDO */}
      <div className="seccion-fondo">
        <img src={Fondo} alt="Fondo decorativo" />
      </div>
      <PieComponente/>
    </>
  );
}

export default App;
