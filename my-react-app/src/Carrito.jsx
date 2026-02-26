import { useEffect, useMemo, useState } from "react";
import "./Carrito.css";

const CARTS_API_URL = "https://fakestoreapi.com/carts";

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

function Carrito() {
  const [carritos, setCarritos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");

        const resCarritos = await fetch(CARTS_API_URL, { signal: controller.signal });

        if (!resCarritos.ok) {
          throw new Error("Error al obtener datos de Fake Store API");
        }

        const dataCarritos = await resCarritos.json();

        setCarritos(Array.isArray(dataCarritos) ? dataCarritos : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudo cargar la información del carrito.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();

    return () => controller.abort();
  }, []);

  const items = useMemo(
    () =>
      carritos.flatMap((carrito) =>
        (carrito.products ?? []).map((item, index) => ({
          clave: `${carrito.id}-${item.productId}-${index}`,
          productoLabel: `Producto ${item.productId}`,
          cantidad: item.quantity ?? 0,
          fecha: formatearFecha(carrito.date)
        }))
      ),
    [carritos]
  );

  if (cargando) {
    return <div className="carrito-estado">Cargando carrito...</div>;
  }

  if (error) {
    return <div className="carrito-estado carrito-error">{error}</div>;
  }

  return (
    <div className="carrito-lista is-visible">
      {items.map((item) => (
        <article className="carrito-card" key={item.clave}>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Nombre</span>
            <strong>{item.productoLabel}</strong>
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Cantidad</span>
            <span>{item.cantidad}</span>
          </div>
          <div className="carrito-card-fila">
            <span className="carrito-etiqueta">Fecha</span>
            <span>{item.fecha}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Carrito;
