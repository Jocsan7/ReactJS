import "./Tarjeta.css";

function Tarjeta({ imagen }) {
  return (
    <div className="tarjeta">
      <img src={imagen} alt="Tarjeta" />
      <h3>Texto 1</h3>
      <p>
        En este apartado se coloca el contenido del texto y las imágenes
        representativas para la tarjeta de información.
      </p>
      <a href="#">Leer más</a>
    </div>
  );
}

export default Tarjeta;
