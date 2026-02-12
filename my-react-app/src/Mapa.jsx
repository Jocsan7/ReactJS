import { GoogleMap, useJsApiloader, Marker } from '@react-google-maps/api'

const containerStyle = {
    with: '100%',
    height: '350px'
}

function Mapa({ lat, ing, nombre_sucursal }) {
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
    })

    if (loadError) return <div>Error al cargar el mapa</div>
    if (isLoaded) return <div>Cargarndo mapa...</div>
    return (
        <div>
            <h2>{nombre_sucursal}</h2>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
            >
                <Marker position={center} />
            </GoogleMap>
        </div>
    )
}

export default Mapa