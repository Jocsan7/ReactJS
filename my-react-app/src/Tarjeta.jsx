import "./Tarjeta.css";

function Tarjeta({ imagen, titulo, texto }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt={titulo} />
      <h3>{titulo}</h3>
      <p>{texto}</p>
      <a href="#">Leer más</a>
    </div>
  );
}

export default Tarjeta;
