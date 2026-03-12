import "./encabezado.css";
import LogoImg from "./assets/zzz_logo.png";
import Facebook from "./assets/redes/facebook.png";
import Instagram from "./assets/redes/instagram.png";
import Tiktok from "./assets/redes/tik-tok.png";
import Whatsapp from "./assets/redes/whatsapp.png";
import Youtube from "./assets/redes/youtube.png";
import Clima from "./Clima";
import { useAuth } from "./AuthContext";

function Encabezado({ seccionActiva, setSeccion }) {
  const { isLoggedIn, logout } = useAuth();
  return (
    <header className="encabezado">
      <div className="logo">
        <img src={LogoImg} alt="Logo" />
      </div>
      <nav className="menu">
        <ul>
          <li className={seccionActiva === "inicio" ? "activo" : ""} onClick={() => setSeccion("inicio")}>Inicio</li>
          <li className={seccionActiva === "acerca" ? "activo" : ""} onClick={() => setSeccion("acerca")}>Acerca</li>
          <li className={seccionActiva === "productos" ? "activo" : ""} onClick={() => setSeccion("productos")}>Productos</li>
          <li className={seccionActiva === "galeria" ? "activo" : ""} onClick={() => setSeccion("galeria")}>Galería</li>
          <li className={seccionActiva === "videos" ? "activo" : ""} onClick={() => setSeccion("videos")}>Vídeos</li>
          <li className={seccionActiva === "contacto" ? "activo" : ""} onClick={() => setSeccion("contacto")}>Contacto</li>
          <li className={seccionActiva === "sucursales" ? "activo" : ""} onClick={() => setSeccion("sucursales")}>Sucursales</li>
          {isLoggedIn ? (
            <>
              <li className={seccionActiva === "usuarios" ? "activo" : ""} onClick={() => setSeccion("usuarios")}>Usuarios</li>
              <li className={seccionActiva === "categorias" ? "activo" : ""} onClick={() => setSeccion("categorias")}>Categorias</li>
              <li
                onClick={() => {
                  logout();
                  setSeccion("inicio");
                }}
              >
                Cerrar Sesion
              </li>
            </>
          ) : (
            <li className={seccionActiva === "login" ? "activo" : ""} onClick={() => setSeccion("login")}>Login</li>
          )}
        </ul>
      </nav>
      <div className="redes-clima">
        <div className="redes">
          <img src={Facebook} alt="Facebook" />
          <img src={Instagram} alt="Instagram" />
          <img src={Tiktok} alt="TikTok" />
          <img src={Whatsapp} alt="WhatsApp" />
          <img src={Youtube} alt="YouTube" />
        </div>
        <Clima />
      </div>
    </header>
  );
}

export default Encabezado;
