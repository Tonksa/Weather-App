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

// Next steps are to fix the error in the WeatherItem component. The issue is to do with getting an array from an asynchronous object.
// A solution is to declare an empty array of all the object keys we need, but it's not great...

export default function WeatherApp() {
    const apikey = 'b1f11b4d3f0df01f841aefb86efe6d47'
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

        console.log('api hit')

    }, [cityData.cityToSearchFor])

    function handleInputChange(e) {
        const { value } = e.target

        setCityData((prevData) => {
            return {
                ...prevData,
                input: value
            }
        })

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