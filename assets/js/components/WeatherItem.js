import React from "react";

// https://openweathermap.org/weather-conditions

let example = {
    "coord": {
        "lon": -2.74,
        "lat": 51.1247
    },
    "weather": [{
        "id": 803,
        "main": "Clouds",
        "description": "broken clouds",
        "icon": "04n"
    }],
    "base": "stations",
    "main": {
        "temp": 290.2,
        "feels_like": 290.31,
        "temp_min": 289.29,
        "temp_max": 291.44,
        "pressure": 1012,
        "humidity": 90
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.12,
        "deg": 170
    },
    "clouds": {
        "all": 75
    },
    "dt": 1666902760,
    "sys": {
        "type": 2,
        "id": 2020646,
        "country": "GB",
        "sunrise": 1666853662,
        "sunset": 1666889705
    },
    "timezone": 3600,
    "id": 2636671,
    "name": "Street",
    "cod": 200
}

export default function WeatherItem(props) {
    const { cod, name, weather } = props.data

    return(
        <div className="weatheritem">
            {cod != 404
                ?
                <>
                    <h3 className="weatheritem__city">{name}</h3>
                    {weather &&
                        <div className="weatheritem__weather">
                            <p>{weather[0].main}</p>
                            <p>{weather[0].description}</p>
                            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
                        </div>
                    }
                </>
                :
                <>
                    <p>City not found!</p>
                </>
            }
        </div>
    )
}