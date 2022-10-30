import React from "react";

export default function WeatherItem(props) {
    const { cod, name, weather, sys, main, clouds } = props.data
    const { citySearched } = props

    function formatDate(timestamp) {
        let unix_timestamp = timestamp
        var date = new Date(unix_timestamp * 1000)
        var hours = date.getHours()
        var minutes = "0" + date.getMinutes()
        var seconds = "0" + date.getSeconds()
        var formattedTime = hours.toString().padStart(2, "0") + ':' + minutes.substr(-2)
        return formattedTime
    }

    function kelvinToCelcius(temp) {
        return (temp - 273.15).toFixed(0) + '\u00B0C'
    }

    return(
        <div className="weatheritem">
            {cod != 404
                ?
                <>
                    <h3 className="weatheritem__city">{name} - {sys && sys.country}</h3>
                    {weather &&
                        <div className="weatheritem__info">
                            <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} />
                            <p><b>Weather:</b> {weather[0].main}</p>
                            <p><b>Temperature:</b> {kelvinToCelcius(main.temp)}</p>
                            {clouds.all != 0 && <p><b>Cloudiness:</b> {clouds.all}%</p>}
                            <p><b>Humidity:</b> {main.humidity}%</p>
                            {sys &&
                                <>
                                    <hr/>
                                    <p><b>Sunrise:</b> {formatDate(sys.sunrise)}</p>
                                    <p><b>Sunset:</b> {formatDate(sys.sunset)}</p>
                                </>
                            }
                        </div>
                    }
                </>
                :
                <>
                    <p className="weatheritem__error"><span className="weatheritem__error__city"><b>{citySearched}</b></span> not found, try another search!</p>
                </>
            }
        </div>
    )
}