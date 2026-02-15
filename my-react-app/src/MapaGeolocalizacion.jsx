import { useCallback, useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "260px"
};

function MapaGeolocalizacion() {
  const [ubicacion, setUbicacion] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(true);

  const traducirError = (geoError) => {
    if (!geoError) return "No fue posible obtener tu ubicación actual.";

    switch (geoError.code) {
      case 1:
        return "Ubicación bloqueada. Permite el acceso a la ubicación en tu navegador para continuar.";
      case 2:
        return "No se pudo determinar tu ubicación (señal o red insuficiente).";
      case 3:
        return "La solicitud de ubicación tardó demasiado. Intenta nuevamente.";
      default:
        return "No fue posible obtener tu ubicación actual.";
    }
  };

  const solicitarUbicacion = useCallback(() => {
    setCargando(true);
    setError("");

    if (!window.isSecureContext) {
      setError("La geolocalización requiere HTTPS o localhost para funcionar.");
      setCargando(false);
      return;
    }

    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      setCargando(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUbicacion({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setCargando(false);
      },
      (geoError) => {
        setError(traducirError(geoError));
        setCargando(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  useEffect(() => {
    solicitarUbicacion();
  }, [solicitarUbicacion]);

  return (
    <div className="ubicacion-actual-card">
      <h3>Tu ubicación actual</h3>

      {error && <p>{error}</p>}

      {!error && cargando && <p>Obteniendo ubicación...</p>}

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

      {error && (
        <button className="ubicacion-reintentar-btn" onClick={solicitarUbicacion} type="button">
          Reintentar ubicación
        </button>
      )}
    </div>
  );
}

export default MapaGeolocalizacion;
