import milogo from './assets/logo.png'
import Facebook from './assets/redes/facebook.png'
import Whatsapp from './assets/redes/Whatsapp.png'
import Instagram from './assets/redes/instagram.png'
import Tiktok from './assets/redes/tik-tok.png'
import Youtube from './assets/redes/youtube.png'
import './Encabezado.css';
function Encabezado(){
    return (
        <div className='Encabezado'>
            <Logo/>
            <Menu/>
            <Redes/>
            <h2>Bienvenido a mi sitio</h2>
        </div>
    );
}
function Logo(){
    return (
        <div className='Logo'>
            <img src={milogo} alt="React Logo" />
        </div>
    );
}

function Menu(){
    return (
        <nav>
            <ul>
                <li>Inicio</li>
                <li>Acerca</li>
                <li>Productos</li>
                <li>Contacto</li>
                <li>Sucursales</li>
            </ul>
        </nav>
    )
}
function Redes(){
    return (
        <div>
            <img src={Facebook} alt="React icon" />
            <img src={Whatsapp} alt="React icon" />
            <img src={Instagram} alt="React icon" />
            <img src={Tiktok} alt="React icon" />
            <img src={Youtube} alt="React icon" />
        </div>
    )
}
export default Encabezado