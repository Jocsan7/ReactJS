import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "260px"
};

function MapaGeolocalizacion() {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalizacion.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => setError("No fue posible obtener tu ubicacion actual."),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="ubicacion-actual-card">
      <h3>Tu ubicacion actual</h3>

      {error && <p>{error}</p>}

      {!error && !ubicacion && <p>Obteniendo ubicacion...</p>}

      {!error && ubicacion && (
        <>
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={ubicacion} zoom={17}>
              <Marker
                position={ubicacion}
                title="Tu ubicacion actual"
                icon="https://maps.google.com/mapfiles/ms/icons/red-dot.png"
              />
            </GoogleMap>
          </LoadScript>
        </>
      )}
    </div>
  );
}

export default MapaGeolocalizacion;
