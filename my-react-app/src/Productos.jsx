import { useEffect, useMemo, useState } from "react";
import RegistrarProductos from "./RegistrarProductos";
import "./Productos.css";

const PRODUCTS_API_URL = "https://fakestoreapi.com/products";

function Productos({ onAgregarAlCarrito }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [productoEditado, setProductoEditado] = useState(null);

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

  const agregarProductoLocal = (nuevoProducto) => {
    const productoConId = {
      ...nuevoProducto,
      id: nuevoProducto?.id ?? Date.now(),
      title: nuevoProducto?.title ?? "Producto",
      price: typeof nuevoProducto?.price === "number" ? nuevoProducto.price : Number(nuevoProducto?.price) || 0,
      category: nuevoProducto?.category ?? "-",
      image: nuevoProducto?.image ?? "",
      description: nuevoProducto?.description ?? "",
    };
    setProductos((prev) => [productoConId, ...prev]);
  };

  const actualizarProductoLocal = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((producto) => (producto.id === productoActualizado.id ? { ...producto, ...productoActualizado } : producto))
    );
  };

  const eliminarProductoLocal = (idProducto) => {
    setProductos((prev) => prev.filter((producto) => producto.id !== idProducto));
    if (productoEditado?.id === idProducto) {
      setProductoEditado(null);
    }
  };

  const iniciarEdicion = (producto) => {
    setProductoEditado(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const items = useMemo(
    () =>
      productos.map((producto, index) => ({
        raw: producto,
        id: producto.id ?? index + 1,
        nombre: `Producto ${index + 1}`,
        imagen: producto.image ?? "",
        tituloApi: producto.title ?? "-",
        descripcion: producto.description ?? "",
        categoria: producto.category ?? "-",
        precioValor: typeof producto.price === "number" ? producto.price : Number(producto.price) || 0,
        precio:
          typeof producto.price === "number"
            ? `$${producto.price.toFixed(2)}`
            : `$${(Number(producto.price) || 0).toFixed(2)}`,
      })),
    [productos]
  );

  return (
    <>
      <RegistrarProductos
        productoEditado={productoEditado}
        limpiarSeleccion={() => setProductoEditado(null)}
        onRegistroExitoso={agregarProductoLocal}
        onActualizacionExitosa={actualizarProductoLocal}
      />

      {cargando ? (
        <div className="productos-estado">Cargando productos...</div>
      ) : error ? (
        <div className="productos-estado productos-error">{error}</div>
      ) : (
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
                <span className="productos-etiqueta">Categoria</span>
                <span>{item.categoria}</span>
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
                      precioValor: item.precioValor,
                    })
                  }
                >
                  Anadir al carrito
                </button>
                <button
                  type="button"
                  className="productos-card-btn-editar"
                  onClick={() => iniciarEdicion(item.raw)}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="productos-card-btn-eliminar"
                  aria-label="Eliminar producto"
                  onClick={() => eliminarProductoLocal(item.id)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M9 3h6l1 2h4v2H4V5h4l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}

export default Productos;
