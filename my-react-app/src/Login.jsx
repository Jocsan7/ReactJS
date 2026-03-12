import React, { useState } from "react";
import api from "./api";
import "./Login.css";
import { useAuth } from "./AuthContext";

function Login({ onLoginSuccess }) {
  const { login, isLoggedIn } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [registroNombre, setRegistroNombre] = useState("");
  const [registroEmail, setRegistroEmail] = useState("");
  const [registroPassword, setRegistroPassword] = useState("");
  const [registroEstado, setRegistroEstado] = useState("");
  const [registroCargando, setRegistroCargando] = useState(false);

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
      login(tokenRecibido);
      localStorage.setItem("authUser", usuario);
      setError("");
      setToken(tokenRecibido);
      alert("Autenticacion autorizada");
      onLoginSuccess?.();
    } catch (errorActual) {
      console.error("Error en login:", errorActual);
      localStorage.removeItem("token");
      localStorage.removeItem("authUser");
      setError("Usuario o contrasena incorrectos");
    } finally {
      setCargando(false);
    }
  };

  const handleRegistro = async (event) => {
    event.preventDefault();
    setRegistroEstado("");
    setRegistroCargando(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));
      setRegistroEstado("Cuenta creada correctamente. Ahora puedes iniciar sesion.");
      setRegistroNombre("");
      setRegistroEmail("");
      setRegistroPassword("");
      setMostrarRegistro(false);
    } catch (errorActual) {
      setRegistroEstado("No se pudo crear la cuenta. Intenta mas tarde.");
    } finally {
      setRegistroCargando(false);
    }
  };

  return (
    <section className="login-shell">
      {!mostrarRegistro && (
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
            <label htmlFor="login-password">Contrasena</label>
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

          {token ? (
            <p className="login-mensaje login-mensaje-exito">Acceso a cuenta exitoso.</p>
          ) : error ? (
            <p className="login-mensaje login-mensaje-error">{error}</p>
          ) : null}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? "Accediendo..." : "Acceder"}
          </button>
        </form>

        <div className="login-links">
          {!isLoggedIn && (
            <button
              type="button"
              className="login-link"
              onClick={() => {
                setMostrarRegistro(true);
                setRegistroEstado("");
              }}
            >
              Crear cuenta
            </button>
          )}
          <button type="button" className="login-link">
            Recuperar Contrasena
          </button>
        </div>
        </article>
      )}

      {!isLoggedIn && mostrarRegistro && (
        <article className="login-card registro-card">
          <header className="registro-encabezado">
            <h3>Crear cuenta</h3>
            <p>Completa tus datos para registrarte.</p>
          </header>

          <form className="login-form" onSubmit={handleRegistro}>
            <div className="login-campo">
              <label htmlFor="registro-usuario">Nombre de usuario</label>
              <input
                id="registro-usuario"
                name="registroUsuario"
                type="text"
                placeholder="Tu usuario"
                value={registroNombre}
                onChange={(event) => setRegistroNombre(event.target.value)}
                required
              />
            </div>

            <div className="login-campo">
              <label htmlFor="registro-email">Email</label>
              <input
                id="registro-email"
                name="registroEmail"
                type="email"
                placeholder="tu@email.com"
                value={registroEmail}
                onChange={(event) => setRegistroEmail(event.target.value)}
                required
              />
            </div>

            <div className="login-campo">
              <label htmlFor="registro-password">Contrasena</label>
              <input
                id="registro-password"
                name="registroPassword"
                type="password"
                placeholder="Crea una contrasena"
                value={registroPassword}
                onChange={(event) => setRegistroPassword(event.target.value)}
                required
              />
            </div>

            {registroEstado ? (
              <p className="login-mensaje login-mensaje-exito">{registroEstado}</p>
            ) : null}

            <button type="submit" className="login-btn" disabled={registroCargando}>
              {registroCargando ? "Creando..." : "Crear cuenta"}
            </button>
          </form>

          <div className="login-links">
            <button
              type="button"
              className="login-link"
              onClick={() => {
                setMostrarRegistro(false);
                setRegistroEstado("");
              }}
            >
              Volver a iniciar sesion
            </button>
          </div>
        </article>
      )}
    </section>
  );
}

export default Login;

