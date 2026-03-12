import { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import "./categorias.css";

const API_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";

const normalizarTexto = (texto = "") => {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (!limpio) return "Sin descripcion disponible.";
  return limpio.length > 160 ? `${limpio.slice(0, 157)}...` : limpio;
};

function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const cargarCategorias = async () => {
      setCargando(true);
      setError("");

      try {
        const respuesta = await fetch(API_URL, { signal: controller.signal });

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener las categorias.");
        }

        const data = await respuesta.json();
        const items = Array.isArray(data?.categories) ? data.categories : [];

        const categoriasNormalizadas = items.map((item) => ({
          id: item.idCategory,
          img: item.strCategoryThumb,
          titulo: item.strCategory,
          texto: normalizarTexto(item.strCategoryDescription)
        }));

        setCategorias(categoriasNormalizadas);
      } catch (errorActual) {
        if (errorActual.name !== "AbortError") {
          setError("No se pudieron cargar las categorias. Intenta mas tarde.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarCategorias();

    return () => controller.abort();
  }, []);

  return (
    <div className="categorias-shell">
      {cargando ? (
        <p className="categorias-estado">Cargando categorias...</p>
      ) : error ? (
        <p className="categorias-estado categorias-error">{error}</p>
      ) : categorias.length === 0 ? (
        <p className="categorias-estado">No hay categorias disponibles.</p>
      ) : (
        <div className="contenedor-tarjetas seccion-categorias grid-5">
          {categorias.map((item) => (
            <Tarjeta key={item.id} imagen={item.img} titulo={item.titulo} texto={item.texto} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Categorias;
