import React, { useState, useEffect } from "react";
import WeatherItem from "./components/WeatherItem";
import Spinner from "./components/Spinner";

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API}
// https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API key}

/** Functionality
 * On input change ensure that react updates the input box
 * After x seconds, using timouts, set the cityName to be the value of the country input field
 * Add cityName to useEffect dependencies
 * use the useEffect hook to set the apiData to the object that has just been returned
 */

// Worth tidying up some of the useStates here - maybe make them easier to read

export default function WeatherApp() {
    const apikey = 'e29b1a270358451c10aab37f7fe1e503'
    const [ cityData, setCityData ] = useState({
        input: '',
        cityToSearchFor: 'Street',
    })
    const [ apiData, setApiData ] = useState({})
    const [ timer, setTimer ] = useState(null)
    const [ spinnerIsVisible, setSpinnerIsVisible ] = useState(true)
    const [ inputTimer, setInputTimer ] = useState(false)
    const countdownFrom = 2000

    const barStyles = {
        marginLeft: `-100%`,
        transition: `all ${countdownFrom}ms linear`
    }

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityData.cityToSearchFor}&appid=${apikey}`)
            .then((response) => response.json())
            .then(data => setApiData(data))
        
            setSpinnerIsVisible(false)
            setInputTimer(false)

    }, [cityData.cityToSearchFor])

    function resetInputTimer() {
        setInputTimer(false)
        setTimeout(() => {
            setInputTimer(true)
        }, 0);
    }

    function handleInputChange(e) {
        const { value } = e.target
        setCityData((prevData) => {
            return {
                ...prevData,
                input: value
            }
        })

        if (value != '') {
            resetInputTimer()
            
            clearTimeout(timer)
            const cityNameChangeTimer = setTimeout(() => {
                setCityData((prevData) => {
                    return {
                        ...prevData,
                        cityToSearchFor: value
                    }
                })
                setSpinnerIsVisible(true)
            }, countdownFrom)
            setTimer(cityNameChangeTimer)
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    return(
        <div className="container">
            <h1>Weather App</h1>
            <div className="weatherapp__wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input__wrapper">
                        <input
                            type="text"
                            placeholder="Enter a City!"
                            name="city"
                            value={cityData.input}
                            onChange={handleInputChange}
                            className="input"
                        />
                    </div>
                </form>

                <span className="bar__wrapper">
                    <span
                        className={`bar${inputTimer ? ' bar--active' : ''}`}
                        style={inputTimer ? barStyles : {}}
                    ></span>
                </span>

                <div className="weatheritem__wrapper">
                    <WeatherItem
                        data={apiData}
                        />
                    {spinnerIsVisible && <Spinner />}
                </div>
            </div>
        </div>
    )
}