import { useEffect, useState } from "react";
import api from "./api";
import "./RegistrarProductos.css";

function RegistrarProductos({ productoEditado, limpiarSeleccion, onRegistroExitoso, onActualizacionExitosa }) {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");

  useEffect(() => {
    if (productoEditado) {
      setTitulo(productoEditado.title ?? "");
      setPrecio(productoEditado.price ?? "");
      setDescripcion(productoEditado.description ?? "");
      setCategoria(productoEditado.category ?? "");
      setImagen(productoEditado.image ?? "");
    } else {
      resetForm();
    }
  }, [productoEditado]);

  const resetForm = () => {
    setTitulo("");
    setPrecio("");
    setDescripcion("");
    setCategoria("");
    setImagen("");
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();
    const nuevoProducto = {
      title: titulo,
      price: Number(precio),
      description: descripcion,
      category: categoria,
      image: imagen,
    };

    try {
      if (productoEditado) {
        const respuesta = await api.put(`/products/${productoEditado.id}`, nuevoProducto);
        if (onActualizacionExitosa) {
          onActualizacionExitosa({ ...productoEditado, ...nuevoProducto, ...respuesta.data });
        }
        alert("Producto actualizado exitosamente");
        limpiarSeleccion?.();
      } else {
        const respuesta = await api.post("/products", nuevoProducto);
        if (onRegistroExitoso) onRegistroExitoso(respuesta.data);
        alert("Producto registrado exitosamente");
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Error al guardar producto");
    }
  };

  return (
    <section className="registro-producto-wrap">
      <h3>{productoEditado ? "Editar Producto" : "Registrar Producto"}</h3>
      <form className="registro-producto-form" onSubmit={manejarEnvio}>
        <div className="registro-campo">
          <label htmlFor="registro-titulo">Titulo</label>
          <input
            id="registro-titulo"
            name="titulo"
            type="text"
            placeholder="Nombre del producto"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-precio">Precio</label>
          <input
            id="registro-precio"
            name="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-descripcion">Descripcion</label>
          <input
            id="registro-descripcion"
            name="description"
            type="text"
            placeholder="Descripcion breve"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-categoria">Categoria</label>
          <input
            id="registro-categoria"
            name="category"
            type="text"
            placeholder="Categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-imagen">Imagen</label>
          <input
            id="registro-imagen"
            name="imagen"
            type="text"
            placeholder="URL de imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="registro-btn">
          {productoEditado ? "Actualizar" : "Registrar"}
        </button>
        {productoEditado ? (
          <button type="button" className="registro-btn registro-btn-cancelar" onClick={() => { resetForm(); limpiarSeleccion?.(); }}>
            Cancelar
          </button>
        ) : null}
      </form>
    </section>
  );
}

export default RegistrarProductos;
