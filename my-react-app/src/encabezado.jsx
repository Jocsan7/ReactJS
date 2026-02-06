import "./encabezado.css";
import LogoImg from "./assets/zzz_logo.png";

// ICONOS DE REDES (nombres reales)
import Facebook from "./assets/redes/facebook.png";
import Instagram from "./assets/redes/instagram.png";
import Tiktok from "./assets/redes/tik-tok.png";
import Whatsapp from "./assets/redes/whatsapp.png";
import Youtube from "./assets/redes/youtube.png";

function Encabezado({ setSeccion }) {
  return (
    <header className="encabezado">

      {/* LOGO */}
      <div className="logo">
        <img src={LogoImg} alt="Logo" />
      </div>

      {/* MENÚ */}
      <nav className="menu">
        <ul>
          <li onClick={() => setSeccion("inicio")}>Inicio</li>
          <li onClick={() => setSeccion("acerca")}>Acerca</li>
          <li onClick={() => setSeccion("productos")}>Productos</li>
          <li onClick={() => setSeccion("galeria")}>Galería</li>
          <li onClick={() => setSeccion("videos")}>Videos</li>
          <li onClick={() => setSeccion("contacto")}>Contacto</li>
          <li onClick={() => setSeccion("sucursales")}>Sucursales</li>
        </ul>
      </nav>

      {/* REDES SOCIALES */}
      <div className="redes">
        <img src={Facebook} alt="Facebook" />
        <img src={Instagram} alt="Instagram" />
        <img src={Tiktok} alt="TikTok" />
        <img src={Whatsapp} alt="WhatsApp" />
        <img src={Youtube} alt="YouTube" />
      </div>

    </header>
  );
}

export default Encabezado;
