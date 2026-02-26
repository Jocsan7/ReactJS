import "./RegistrarProductos.css";

function RegistrarProductos() {
  const manejarEnvio = (event) => {
    event.preventDefault();
  };

  return (
    <section className="registro-producto-wrap">
      <h3>Registrar Producto</h3>
      <form className="registro-producto-form" onSubmit={manejarEnvio}>
        <div className="registro-campo">
          <label htmlFor="registro-titulo">Titulo</label>
          <input id="registro-titulo" name="titulo" type="text" placeholder="Nombre del producto" />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-precio">Precio</label>
          <input id="registro-precio" name="price" type="number" min="0" step="0.01" placeholder="0.00" />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-descripcion">Descripcion</label>
          <input id="registro-descripcion" name="description" type="text" placeholder="Descripcion breve" />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-categoria">Categoria</label>
          <input id="registro-categoria" name="category" type="text" placeholder="Categoria" />
        </div>

        <div className="registro-campo">
          <label htmlFor="registro-imagen">Imagen</label>
          <input id="registro-imagen" name="imagen" type="text" placeholder="URL de imagen" />
        </div>

        <button type="submit" className="registro-btn">
          Registrar
        </button>
      </form>
    </section>
  );
}

export default RegistrarProductos;
