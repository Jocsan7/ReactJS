import Tarjeta from "./Tarjeta";

function ContenedorTarjeta({ seccion, contenido }) {
  const items =
    seccion === "productos" || seccion === "galeria" || seccion === "videos"
      ? Array.from({ length: 12 }, (_, i) => contenido[seccion][i % contenido[seccion].length])
      : contenido[seccion];

  return (
    <div
      className={`contenedor-tarjetas ${
        ["productos", "galeria", "videos"].includes(seccion) ? "grid-5" : ""
      } ${seccion === "sucursales" ? "grid-2" : ""}`}
    >
      {items.map((item, index) => (
        <Tarjeta
          key={index}
          imagen={item.img}
          titulo={item.titulo}
          texto={item.texto}
        />
      ))}
    </div>
  );
}

export default ContenedorTarjeta;
