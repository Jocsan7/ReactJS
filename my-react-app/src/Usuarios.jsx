import { useEffect, useState } from "react";
import "./Usuarios.css";
import RegistrarUsuarios from "./RegistrarUsuarios";
import "./RegistrarUsuarios.css"

const USERS_API_URL = "https://fakestoreapi.com/users";

const capitalizarInicio = (valor) => {
  if (typeof valor !== "string" || !valor.trim()) return "-";
  return valor
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (letra) => letra.toUpperCase());
};

function Usuarios({ panelVisible }) {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  if (cargando) {
    return (
      <div className="usuarios-estado usuarios-cargando">
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return <div className="usuarios-estado usuarios-error">{error}</div>;
  }

  return (
    <div className={`usuarios-tabla-wrap ${panelVisible ? "is-visible" : ""}`}>
      <div className="usuarios-tabla-scroll">
        <table className="usuarios-tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Contraseña</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Calle</th>
              <th>Número</th>
              <th>Código Postal</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
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
                  <button type="button" className="accion-btn editar-btn" aria-label="Editar usuario">
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
  );
}

export default Usuarios;
