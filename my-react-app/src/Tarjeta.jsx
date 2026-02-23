import "./Tarjeta.css";

function Tarjeta({ imagen, titulo, texto, lat, lng, enlace = "#", textoEnlace = "Leer mas" }) {
  const tieneCoordenadas = typeof lat === "number" && typeof lng === "number";
  const claseAutor = titulo === "Autor" ? "tarjeta-autor" : "";
  const href = typeof enlace === "string" && enlace.trim() ? enlace : "#";

  return (
    <article className={`tarjeta ${claseAutor}`.trim()}>
      {tieneCoordenadas ? (
        <iframe
          className="tarjeta-mapa"
          title={`Mapa de ${titulo}`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <img src={imagen} alt={titulo} loading="lazy" />
      )}

      <h3>{titulo}</h3>
      <p>{texto}</p>
      <a
        href={href}
        onClick={(event) => {
          if (href === "#") {
            event.preventDefault();
          }
        }}
      >
        {textoEnlace}
      </a>
    </article>
  );
}

export default Tarjeta;
