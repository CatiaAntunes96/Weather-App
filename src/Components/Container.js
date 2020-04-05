import React, {useState, useEffect} from "react";
import Form from "./Form";
import Widget from "./Widget";
import Geolocation from "@react-native-community/geolocation";
import {FaLocationArrow} from "react-icons/fa";
import { IconContext } from "react-icons";
import "../Style/Container.css"

const Container = () => {
    const key = "a344a8616f2fc3419b82cb43df6fa644";
    const [weather, setWeather] = useState({
        name: "",
        country: {},
        weather: [],
        main: {},
        wind: {},
        icon: {}
    });
    const [search, setSearch] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [display, setDisplay] = useState(false);
    const [coordinates, setCoordinates] = useState({
        lat: "0",
        lon: "0"
    });
    const [GPSOn, setGPSOn] = useState(false);

    function displayLocationInfo(position) {
        setCoordinates({
            lat: position.coords.latitude.toFixed(2),
            lon: position.coords.longitude.toFixed(2)
        })
    }

    const getWeatherGPS = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${key}`)
        const gps = await response.json();
        setWeather({
            name: gps.name,
            country: gps.sys,
            weather: gps.weather.map(el => el.description),
            main: gps.main,
            wind: gps.wind,
            icon: gps.weather[0]
        })
    }

    useEffect(()=>{
        getWeatherGPS()
    }, [coordinates])

    function clickGPS () {
        if(navigator.geolocation) {
        Geolocation.getCurrentPosition(displayLocationInfo);
        setGPSOn(true)
        setDisplay(false)
        }
    }

    const getWeather = async () => {
        if(!search) 
        return;

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`);
        const data = await response.json();
        setWeather({
            name: data.name,
            country: data.sys,
            weather: data.weather.map(el => el.description),
            main: data.main,
            wind: data.wind,
            icon: data.weather[0]
        })
    }
    
    useEffect(() => {
        getWeather();
    }, [search])

    function handleChange (e) {
        setInputValue(e.target.value)
    }

    function getSearch (e) {
        if (inputValue !== "") {
        e.preventDefault();
        setDisplay(true);
        setSearch(inputValue);
        setInputValue("");
        setGPSOn(false);
        } 
        else {
            setDisplay(false)
        }
    }

    return(
        <div className="weather-container">
            <div className="set-location-container">
            <Form 
            submit={getSearch}
            input={inputValue}
            handleChange={handleChange}
            />
            <IconContext.Provider value={{color: "white", className:"gps-icon"}} >
            <button onClick={clickGPS} className="gps-button" ><FaLocationArrow/></button>
            </IconContext.Provider>
            </div>
            {GPSOn ? 
            <Widget 
            city={weather.name}
            country={weather.country}
            weather={weather.weather}
            details={weather.main}
            wind={weather.wind}
            icon={weather.icon}
            /> 
            : <div className="empty-div"></div>}
            {display ? 
            <Widget 
            city={weather.name}
            country={weather.country}
            weather={weather.weather}
            details={weather.main}
            wind={weather.wind}
            icon={weather.icon}
            />
            :
            <div className="empty-div"></div>} 
        </div>
    )
}

export default Container;