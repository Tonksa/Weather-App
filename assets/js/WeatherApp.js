import React, { useState, useEffect } from "react";
import WeatherItem from "./components/WeatherItem";

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API}
// https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}

/** Functionality
 * On input change ensure that react updates the input box
 * After x seconds, using timouts, set the cityName to be the value of the country input field
 * Add cityName to useEffect dependencies
 * use the useEffect hook to set the apiData to the object that has just been returned
 */

export default function WeatherApp() {
    const apikey = 'e29b1a270358451c10aab37f7fe1e503'
    const [ cityData, setCityData ] = useState({
        input: '',
        cityToSearchFor: 'Street'
    })
    const [ apiData, setApiData ] = useState({})
    const [ timer, setTimer ] = useState(null)

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityData.cityToSearchFor}&appid=${apikey}`)
            .then((response) => response.json())
            .then(data => setApiData(data))

    }, [cityData.cityToSearchFor])

    function handleInputChange(e) {
        const { value } = e.target

        setCityData((prevData) => {
            return {
                ...prevData,
                input: value
            }
        })

        if (value != '') {
            clearTimeout(timer)
            const cityNameChangeTimer = setTimeout(() => {
                setCityData((prevData) => {
                    return {
                        ...prevData,
                        cityToSearchFor: value
                    }
                })
            }, 1000)
            setTimer(cityNameChangeTimer)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return(
        <div>
            <h1>Test</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="City..."
                    name="city"
                    value={cityData.input}
                    onChange={handleInputChange}
                />
            </form>

            <WeatherItem
                data={apiData}
                />
        </div>
    )
}