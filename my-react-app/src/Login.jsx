import { useState } from "react";
import api from "./api";
import "./Login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setToken("");
    setCargando(true);

    try {
      const respuesta = await api.post("/auth/login", {
        username: usuario,
        password,
      });

      const tokenRecibido = respuesta?.data?.token;

      if (!tokenRecibido) {
        throw new Error("Token no recibido");
      }

      console.log("Token recibido:", tokenRecibido);
      localStorage.setItem("authToken", tokenRecibido);
      localStorage.setItem("authUser", usuario);
      setToken(tokenRecibido);
    } catch (errorActual) {
      console.error("Error en login:", errorActual);
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      setError("Usuario o contrasena incorrectos");
    } finally {
      setCargando(false);
    }
  };

  return (
    <section className="login-shell">
      <article className="login-card">
        <div className="login-avatar" aria-hidden="true">
          <svg viewBox="0 0 64 64">
            <circle cx="32" cy="22" r="12" />
            <path d="M32 38c-11.6 0-21 8-21 18v2h42v-2c0-10-9.4-18-21-18z" />
          </svg>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-campo">
            <label htmlFor="login-usuario">Usuario</label>
            <input
              id="login-usuario"
              name="usuario"
              type="text"
              placeholder="Ingresa tu usuario"
              value={usuario}
              onChange={(event) => setUsuario(event.target.value)}
              required
            />
          </div>

          <div className="login-campo">
            <label htmlFor="login-password">Contraseña</label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Ingresa tu contrasena"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error ? <p className="login-mensaje login-mensaje-error">{error}</p> : null}
          {token ? <p className="login-mensaje login-mensaje-exito">Acceso a cuenta exitoso.</p> : null}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Accediendo..." : "Acceder"}
          </button>
        </form>

        <div className="login-links">
          <button type="button" className="login-link">
            Crear cuenta
          </button>
          <button type="button" className="login-link">
            Recuperar contraseña
          </button>
        </div>
      </article>
    </section>
  );
}

export default Login;
