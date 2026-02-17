/*20.174995162630026, -98.05335896232128*/
import { useEffect, useState } from "react";
import "./Clima.css";

function Clima() {
    const [clima, setClima] = useState(null);
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const lat = 20.174995162630026;
    const lng = -98.05335896232128;

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=es`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setClima(data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return (
        <div className="divClima">
            {clima ? (
                <>
                    <p>{clima.name} Temp: {clima.main.temp} C | Hum: {clima.main.humidity}%</p>
                </>
            ) : (
                <p>Cargando clima...</p>
            )}
        </div>
    );
}

export default Clima;

