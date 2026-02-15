import { useEffect, useRef, useState } from "react";
import Tarjeta from "./Tarjeta";
import MapaGeolocalizacion from "./MapaGeolocalizacion";
import "./ContenedorTarjeta.css";

function ContenedorTarjeta({ seccion, contenido }) {
  const encabezados = {
    inicio: {
      titulo: "Bienvenido a Nueva Eridu",
      subtitulo: "El portal central del proyecto inspirado en Zenless Zone Zero"
    },
    acerca: {
      titulo: "Acerca del Proyecto",
      subtitulo: "Panel informativo oficial con contexto, enfoque visual y arquitectura del sitio"
    },
    productos: {
      titulo: "Tienda Oficial de Objetos",
      subtitulo: "Colección premium de productos inspirados en el universo de Zenless"
    },
    galeria: {
      titulo: "Galería Visual",
      subtitulo: "Imágenes oficiales y arte conceptual de cada versión"
    },
    videos: {
      titulo: "Multimedia y Clips",
      subtitulo: "Contenido audiovisual destacado y presentaciones del proyecto"
    },
    contacto: {
      titulo: "Contáctanos",
      subtitulo: "¿Tienes dudas o comentarios? Estamos aquí para ayudarte"
    },
    sucursales: {
      titulo: "Puntos de Servicio",
      subtitulo: "Ubicaciones y contactos de nuestras oficinas y representación"
    }
  };

  const encabezadoActual = encabezados[seccion];

  const panelRef = useRef(null);
  const [panelVisible, setPanelVisible] = useState(false);

  useEffect(() => {
    setPanelVisible(false);

    const nodo = panelRef.current;
    if (!nodo) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPanelVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(nodo);

    return () => observer.disconnect();
  }, [seccion]);

  const items =
    seccion === "productos" || seccion === "galeria" || seccion === "videos"
      ? Array.from({ length: 12 }, (_, i) => contenido[seccion][i % contenido[seccion].length])
      : contenido[seccion];

  const clases = `contenedor-tarjetas seccion-${seccion} ${
    ["productos", "galeria", "videos"].includes(seccion) ? "grid-5" : ""
  } ${seccion === "sucursales" ? "grid-2" : ""}`;

  if (seccion === "sucursales") {
    return (
      <section className="sucursales-seccion">
        <div
          ref={panelRef}
          className={`seccion-panel seccion-panel-sucursales ${panelVisible ? "is-visible" : ""}`}
        >
          {encabezadoActual && (
            <div className="seccion-panel-encabezado">
              <h2>{encabezadoActual.titulo}</h2>
              <p>{encabezadoActual.subtitulo}</p>
            </div>
          )}
          <div className="panel-hud" aria-hidden="true">
            <span className="hud-corner hud-tl" />
            <span className="hud-corner hud-tr" />
            <span className="hud-corner hud-bl" />
            <span className="hud-corner hud-br" />
          </div>
          <div className={clases}>
            {items.map((item, index) => (
              <Tarjeta
                key={`${seccion}-${index}`}
                imagen={item.img}
                titulo={item.titulo}
                texto={item.texto}
                lat={item.lat}
                lng={item.lng}
              />
            ))}
          </div>
        </div>
        <div className="ubicacion-actual-wrapper">
          <MapaGeolocalizacion />
        </div>
      </section>
    );
  }

  if (seccion === "acerca") {
    return (
      <section
        ref={panelRef}
        className={`seccion-panel seccion-acerca-panel seccion-panel-acerca ${panelVisible ? "is-visible" : ""}`}
      >
        {encabezadoActual && (
          <div className="seccion-panel-encabezado seccion-acerca-encabezado">
            <h2>{encabezadoActual.titulo}</h2>
            <p>{encabezadoActual.subtitulo}</p>
          </div>
        )}
        <div className="panel-hud" aria-hidden="true">
          <span className="hud-corner hud-tl" />
          <span className="hud-corner hud-tr" />
          <span className="hud-corner hud-bl" />
          <span className="hud-corner hud-br" />
        </div>
        <div className={clases}>
          {items.map((item, index) => (
            <Tarjeta
              key={`${seccion}-${index}`}
              imagen={item.img}
              titulo={item.titulo}
              texto={item.texto}
              lat={item.lat}
              lng={item.lng}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={panelRef}
      className={`seccion-panel seccion-panel-${seccion} ${panelVisible ? "is-visible" : ""}`}
    >
      {encabezadoActual && (
        <div className="seccion-panel-encabezado">
          <h2>{encabezadoActual.titulo}</h2>
          <p>{encabezadoActual.subtitulo}</p>
        </div>
      )}
      <div className="panel-hud" aria-hidden="true">
        <span className="hud-corner hud-tl" />
        <span className="hud-corner hud-tr" />
        <span className="hud-corner hud-bl" />
        <span className="hud-corner hud-br" />
      </div>
      <div className={clases}>
        {items.map((item, index) => (
          <Tarjeta
            key={`${seccion}-${index}`}
            imagen={item.img}
            titulo={item.titulo}
            texto={item.texto}
            lat={item.lat}
            lng={item.lng}
          />
        ))}
      </div>
    </section>
  );
}

export default ContenedorTarjeta;
