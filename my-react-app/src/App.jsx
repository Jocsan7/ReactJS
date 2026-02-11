import { useState } from "react";
import Encabezado from "./encabezado";
import Tarjeta from "./Tarjeta";
import PieComponente from "./PieComponente";
import "./App.css";

// IMÁGENES ACTUALES
import Estrellas from "./assets/Tarjetas/Estrellas.png";
import Krampus from "./assets/Tarjetas/Krampus.png";
import SDV from "./assets/Tarjetas/SDV.png";
import Seccion6 from "./assets/Tarjetas/Seccion6.png";
const Fondo = "https://images2.alphacoders.com/132/1329303.jpeg";

function App() {

  // SECCIÓN ACTIVA
  const [seccion, setSeccion] = useState("inicio");

  // CONTENIDO POR SECCIÓN
  const contenido = {
    inicio: [
      { img: "https://fastcdn.hoyoverse.com/content-v2/plat/124392/3ba9a74bbed3272ff0a14e861e1e8418_8660564063196114626.png", titulo: "Historia principal", texto: "La civilización contemporánea fue destruida por un desastre sobrenatural llamado \"Huecos\". Nueva Eridu logró sobrevivir gracias a su tecnología para extraer recursos valiosos..." },
      { img: "https://zzz.honeyhunterworld.com/img/tutorial/999231001-tutorial_image.webp", titulo: "TOPS", texto: "Está formada por los conglomerados corporativos más poderosos e influyentes de Nueva Eridu. TOPS tiene un peso clave en casi todos los sectores urbanos y rivaliza con la familia Mayflower..." },
      { img: "https://upload-os-bbs.hoyolab.com/upload/2024/08/23/401316945/c86276c2025c6b0cd57267f135cfb4cc_2293042323653874762.jpeg", titulo: "Cavidades", texto: "Las Cavidades son catástrofes esféricas que aparecen de la nada y devoran todo a su paso. En su interior se distorsionan el espacio y el tiempo, habitan seres etéreos y existe riesgo de corrupción y mutación..." },
      { img: "https://fbi.cults3d.com/uploaders/18178453/illustration-file/40b71dd9-fb18-4b16-b901-c66a3bd718ff/Your-paragraph-text-2.png", titulo: "Facciones", texto: "Las facciones en Zenless Zone Zero reúnen agentes jugables, Combat Bangboo, enemigos y NPC, como corporaciones y organizaciones que comparten identidad, objetivo o afiliación..." },
      { img: "https://pbs.twimg.com/media/HAvZtLnbIAADmVu.jpg", titulo: "Texto 5", texto: "Contenido de inicio 5" },
      { img: "https://fastcdn.hoyoverse.com/content-v2/plat/124392/3ba9a74bbed3272ff0a14e861e1e8418_8660564063196114626.png", titulo: "Void Hunter", texto: "Cazador del Vacio es un prestigioso titulo otorgado por el alcalde a quienes logran grandes hazanas: proteger la ciudad frente a Huecos peligrosos o impulsar tecnologias revolucionarias..." }
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
      <div
        className={`contenedor-tarjetas ${
          ["productos", "galeria", "videos"].includes(seccion) ? "grid-5" : ""
        } ${
          seccion === "sucursales" ? "grid-2" : ""
        }`}
      >
        {(seccion === "productos" || seccion === "galeria" || seccion === "videos"
          ? Array.from({ length: 12 }, (_, i) => contenido[seccion][i % contenido[seccion].length])
          : contenido[seccion]
        ).map((item, index) => (
          <Tarjeta
            key={index}
            imagen={item.img}
            titulo={item.titulo}
            texto={item.texto}
          />
        ))}
      </div>

      {/* FONDO: solo en "inicio" */}
      {seccion === "inicio" && (
        <div className="seccion-fondo">
          <img src={Fondo} alt="Fondo decorativo" />
        </div>
      )}
      <PieComponente/>
    </>
  );
}

export default App;
