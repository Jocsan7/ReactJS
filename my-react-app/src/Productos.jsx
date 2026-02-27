import { useEffect, useMemo, useState } from "react";
import RegistrarProductos from "./RegistrarProductos";
import "./Productos.css";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

function Productos({ onAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(PRODUCTS_API_URL, { signal: controller.signal });
        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los productos.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();

    return () => controller.abort();
  }, []);

  const items = useMemo(
    () =>
      productos.map((producto, index) => ({
        id: producto.id ?? index + 1,
        nombre: `Producto ${index + 1}`,
        imagen: producto.image ?? "",
        tituloApi: producto.title ?? "-",
        descripcion: producto.description ?? "",
        precioValor: typeof producto.price === "number" ? producto.price : 0,
        precio: typeof producto.price === "number" ? `$${producto.price.toFixed(2)}` : "-"
      })),
    [productos]
  );

  if (cargando) {
    return (
      <>
        <RegistrarProductos />
        <div className="productos-estado">Cargando productos...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <RegistrarProductos />
        <div className="productos-estado productos-error">{error}</div>
      </>
    );
  }

  return (
    <>
      <RegistrarProductos />
      <div className="productos-lista is-visible">
        {items.map((item) => (
          <article className="productos-card" key={item.id}>
            <div className="productos-card-imagen-wrap">
              <img className="productos-card-imagen" src={item.imagen} alt={item.tituloApi} loading="lazy" />
            </div>
            <div className="productos-card-fila">
              <span className="productos-etiqueta">Nombre</span>
              <strong>{item.nombre}</strong>
            </div>
            <div className="productos-card-fila">
              <span className="productos-etiqueta">Precio</span>
              <span>{item.precio}</span>
            </div>
            <div className="productos-card-acciones">
              <button
                type="button"
                className="productos-card-btn"
                onClick={() =>
                  onAgregarAlCarrito?.({
                    id: item.id,
                    nombre: item.nombre,
                    imagen: item.imagen,
                    descripcion: item.descripcion,
                    precio: item.precio,
                    precioValor: item.precioValor
                  })
                }
              >
                Añadir al carrito
              </button>
              <button type="button" className="productos-card-btn-eliminar" aria-label="Eliminar producto">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z" />
                </svg>
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default Productos;
