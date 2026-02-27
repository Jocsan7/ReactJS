import "./Carrito.css";

const formatearFecha = (valor) => {
  if (!valor) return "-";
  const fecha = new Date(valor);
  if (Number.isNaN(fecha.getTime())) return "-";
  return fecha.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
};

function Carrito({ itemsCarrito = [] }) {
  if (!itemsCarrito.length) {
    return <div className="carrito-estado">Aún no hay productos en el carrito.</div>;
  }

  return (
    <div className="carrito-lista is-visible">
      {itemsCarrito.map((item) => (
        <article className="carrito-card" key={item.id}>
          <div className="carrito-card-imagen-wrap">
            <img className="carrito-card-imagen" src={item.imagen} alt={item.nombre} loading="lazy" />
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Nombre</span>
            <strong>{item.nombre}</strong>
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Precio</span>
            <span>{item.precio}</span>
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Cantidad</span>
            <span>{item.cantidad}</span>
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Fecha</span>
            <span>{formatearFecha(item.fecha)}</span>
          </div>
          <div className="carrito-card-acciones">
            <button
              type="button"
              className="carrito-card-btn-eliminar"
              aria-label={`Eliminar ${item.nombre} del carrito`}
            >
              Eliminar
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Carrito;
