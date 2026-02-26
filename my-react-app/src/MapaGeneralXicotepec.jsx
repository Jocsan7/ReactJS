import "./MapaGeneralXicotepec.css";

function MapaGeneralXicotepec() {
  return (
    <section className="mapa-general-xicotepec" aria-label="Mapa general de Xicotepec de Juarez">
      <iframe
        title="Mapa de Xicotepec de Juarez"
        src="https://www.google.com/maps?q=Xicotepec+de+Juarez,+Puebla&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}

export default MapaGeneralXicotepec;
