import Tarjeta from "./Tarjeta";
import MapaGeolocalizacion from "./MapaGeolocalizacion";

function ContenedorTarjeta({ seccion, contenido }) {
  const items =
    seccion === "productos" || seccion === "galeria" || seccion === "videos"
      ? Array.from({ length: 12 }, (_, i) => contenido[seccion][i % contenido[seccion].length])
      : contenido[seccion];

  const clases = `contenedor-tarjetas ${
    ["productos", "galeria", "videos"].includes(seccion) ? "grid-5" : ""
  } ${seccion === "sucursales" ? "grid-2" : ""}`;

  if (seccion === "sucursales") {
    return (
      <section className="sucursales-seccion">
        <div className={clases}>
          {items.map((item, index) => (
            <Tarjeta
              key={index}
              imagen={item.img}
              titulo={item.titulo}
              texto={item.texto}
              lat={item.lat}
              lng={item.lng}
            />
          ))}
        </div>
        <div className="ubicacion-actual-wrapper">
          <MapaGeolocalizacion />
        </div>
      </section>
    );
  }

  return (
    <div className={clases}>
      {items.map((item, index) => (
        <Tarjeta
          key={index}
          imagen={item.img}
          titulo={item.titulo}
          texto={item.texto}
          lat={item.lat}
          lng={item.lng}
        />
      ))}
    </div>
  );
}

export default ContenedorTarjeta;
