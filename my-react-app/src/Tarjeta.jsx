import "./Tarjeta.css";

function Tarjeta({ imagen, titulo, texto, lat, lng }) {
  const tieneCoordenadas = typeof lat === "number" && typeof lng === "number";

  return (
    <div className="tarjeta">
      {tieneCoordenadas ? (
        <iframe
          className="tarjeta-mapa"
          title={`Mapa de ${titulo}`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=13&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <img src={imagen} alt={titulo} />
      )}
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <a href="#">Leer más</a>
    </div>
  );
}

export default Tarjeta;
