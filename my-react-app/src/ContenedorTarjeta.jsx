import { useEffect, useRef, useState } from "react";
import Tarjeta from "./Tarjeta";
import TarjetaVideo from "./TarjetaVideo";
import MapaGeolocalizacion from "./MapaGeolocalizacion";
import Facebook from "./assets/redes/facebook.png";
import Instagram from "./assets/redes/instagram.png";
import Tiktok from "./assets/redes/tik-tok.png";
import Whatsapp from "./assets/redes/whatsapp.png";
import Youtube from "./assets/redes/youtube.png";
import Usuarios from "./Usuarios";
import Carrito from "./Carrito";
import Productos from "./Productos";
import "./ContenedorTarjeta.css";

function ContenedorTarjeta({ seccion, contenido }) {
  const [carritoItems, setCarritoItems] = useState([]);

  const agregarAlCarrito = (producto) => {
    if (!producto?.id) return;

    setCarritoItems((prevItems) => {
      const indexExistente = prevItems.findIndex((item) => item.id === producto.id);

      if (indexExistente >= 0) {
        return prevItems.map((item, index) =>
          index === indexExistente ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prevItems, { ...producto, cantidad: 1, fecha: new Date().toISOString() }];
    });
  };

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
      subtitulo: "Productos obtenidos desde Fake Store API"
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
    usuarios: {
      titulo: "Usuarios",
      subtitulo: "Lista de usuarios cargados desde Fake Store API"
    },
    carrito: {
      titulo: "Carrito",
      subtitulo: "Productos del carrito obtenidos desde Fake Store API"
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

  const datosSeccion = contenido[seccion] ?? [];

  const items = datosSeccion;

  const clases = `contenedor-tarjetas seccion-${seccion} ${
    ["productos", "galeria"].includes(seccion) ? "grid-5" : ""
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

  if (seccion === "contacto") {
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

        <div className="contacto-layout">
          <article className="contacto-form-card">
            <h3>Formulario de contacto</h3>
            <form
              className="contacto-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label htmlFor="contacto-nombre">Nombre</label>
              <input id="contacto-nombre" name="nombre" type="text" placeholder="Tu nombre" required />

              <label htmlFor="contacto-email">Email</label>
              <input id="contacto-email" name="email" type="email" placeholder="tu@email.com" required />

              <label htmlFor="contacto-asunto">Asunto</label>
              <input id="contacto-asunto" name="asunto" type="text" placeholder="Asunto del mensaje" required />

              <label htmlFor="contacto-mensaje">Mensaje</label>
              <textarea
                id="contacto-mensaje"
                name="mensaje"
                placeholder="Escribe tu mensaje"
                rows={5}
                required
              />

              <button type="submit">Enviar Mensaje</button>
            </form>
          </article>

          <aside className="contacto-info-card">
            <h3>Información de contacto</h3>
            <ul className="contacto-info-lista">
              <li>
                <strong>Email:</strong> contacto@ejemplo.com
              </li>
              <li>
                <strong>Teléfono:</strong> +52 776 123 39 82
              </li>
              <li>
                <strong>Ubicación:</strong> Nueva Eridu, Sector Central
              </li>
            </ul>

            <div className="contacto-redes">
              <a href="#" aria-label="Facebook">
                <img src={Facebook} alt="Facebook" loading="lazy" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src={Instagram} alt="Instagram" loading="lazy" />
              </a>
              <a href="#" aria-label="TikTok">
                <img src={Tiktok} alt="TikTok" loading="lazy" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <img src={Whatsapp} alt="WhatsApp" loading="lazy" />
              </a>
              <a href="#" aria-label="YouTube">
                <img src={Youtube} alt="YouTube" loading="lazy" />
              </a>
            </div>

            <div className="contacto-info-media">
              <img
                src="https://www.pcinvasion.com/wp-content/uploads/2024/04/Zenless-Zone-Zero-PS5-Technical-Test.jpg?fit=1280%2C720"
                alt="Zenless Zone Zero"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>
    );
  }

  if (seccion === "videos") {
    return (
      <section
        ref={panelRef}
        className={`seccion-panel seccion-panel-${seccion} ${panelVisible ? "is-visible" : ""}`}
      >
        <div className="videos-categorias">
          {contenido.videos.map((categoria, categoriaIndex) => (
            <article className="videos-categoria" key={`videos-categoria-${categoriaIndex}`}>
              <header className="videos-categoria-encabezado">
                <h2>{categoria.categoria}</h2>
                <p>{categoria.subtitulo}</p>
              </header>
              <div className="contenedor-tarjetas seccion-videos seccion-galeria grid-5 videos-grid">
                {categoria.items.map((item, itemIndex) => (
                  <TarjetaVideo
                    key={`videos-item-${categoriaIndex}-${itemIndex}`}
                    titulo={item.titulo}
                    texto={item.texto}
                    videoUrl={item.url}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (seccion === "productos") {
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
        <Productos onAgregarAlCarrito={agregarAlCarrito} />
      </section>
    );
  }

  if (seccion === "usuarios") {
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
        <Usuarios panelVisible={panelVisible} />
      </section>
    );
  }

  if (seccion === "carrito") {
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
        <Carrito itemsCarrito={carritoItems} />
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
