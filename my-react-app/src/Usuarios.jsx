import { useEffect, useState } from "react";
import "./Usuarios.css";
import RegistrarUsuarios from "./RegistrarUsuarios";

const USERS_API_URL = "https://fakestoreapi.com/users";

const capitalizarInicio = (valor) => {
  if (typeof valor !== "string" || !valor.trim()) return "-";
  return valor
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

function Usuarios({ panelVisible, onRegistroExitoso }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const cargarUsuarios = async () => {
      try {
        setCargando(true);
        setError("");

        const respuesta = await fetch(USERS_API_URL, { signal: controller.signal });
        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setUsuarios(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("No se pudieron cargar los usuarios. Intenta de nuevo.");
        }
      } finally {
        setCargando(false);
      }
    };

    cargarUsuarios();

    return () => controller.abort();
  }, []);

  const agregarUsuarioLocal = (nuevoUsuario) => {
    const usuarioConId = {
      ...nuevoUsuario,
      id: nuevoUsuario?.id ?? Date.now(),
      username: nuevoUsuario?.username ?? "-",
      email: nuevoUsuario?.email ?? "-",
      password: nuevoUsuario?.password ?? "-",
    };
    setUsuarios((prev) => [usuarioConId, ...prev]);
  };

  const actualizarUsuarioLocal = (usuarioActualizado) => {
    setUsuarios((prev) =>
      prev.map((usuario) => (usuario.id === usuarioActualizado.id ? { ...usuario, ...usuarioActualizado } : usuario))
    );
  };

  const iniciarEdicion = (usuario) => {
    setUsuarioEditado(usuario);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <RegistrarUsuarios
        usuarioEditado={usuarioEditado}
        limpiarSeleccion={() => setUsuarioEditado(null)}
        onRegistroExitoso={(nuevoUsuario) => {
          agregarUsuarioLocal(nuevoUsuario);
          onRegistroExitoso?.(nuevoUsuario);
        }}
        onActualizacionExitosa={actualizarUsuarioLocal}
      />

      {cargando ? (
        <div className="usuarios-estado usuarios-cargando">Cargando usuarios...</div>
      ) : error ? (
        <div className="usuarios-estado usuarios-error">{error}</div>
      ) : (
        <div className={`usuarios-tabla-wrap ${panelVisible ? "is-visible" : ""}`}>
          <h2 className="usuarios-titulo">Usuarios Registrados</h2>
          <div className="usuarios-tabla-scroll">
            <table className="usuarios-tabla">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Usuario</th>
                  <th>Email</th>
                  <th>Contrasena</th>
                  <th>Telefono</th>
                  <th>Ciudad</th>
                  <th>Calle</th>
                  <th>Numero</th>
                  <th>Codigo Postal</th>
                  <th>Latitud</th>
                  <th>Longitud</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className={usuarioEditado?.id === usuario.id ? "fila-seleccionada" : ""}>
                    <td>{usuario.id}</td>
                    <td>{capitalizarInicio(usuario.name?.firstname)}</td>
                    <td>{capitalizarInicio(usuario.name?.lastname)}</td>
                    <td>{usuario.username ?? "-"}</td>
                    <td>{usuario.email ?? "-"}</td>
                    <td>{usuario.password ?? "-"}</td>
                    <td>{usuario.phone ?? "-"}</td>
                    <td>{capitalizarInicio(usuario.address?.city)}</td>
                    <td>{capitalizarInicio(usuario.address?.street)}</td>
                    <td>{usuario.address?.number ?? "-"}</td>
                    <td>{usuario.address?.zipcode ?? "-"}</td>
                    <td>{usuario.address?.geolocation?.lat ?? "-"}</td>
                    <td>{usuario.address?.geolocation?.long ?? "-"}</td>
                    <td className="usuarios-acciones">
                      <button
                        type="button"
                        className="accion-btn editar-btn"
                        aria-label="Editar usuario"
                        onClick={() => iniciarEdicion(usuario)}
                      >
                        EDITAR
                      </button>
                      <button type="button" className="accion-btn borrar-btn" aria-label="Borrar usuario">
                        ELIMINAR
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Usuarios;
