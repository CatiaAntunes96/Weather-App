import React, {useState} from "react";
import "../Style/Widget.css"

const Widget = ({city, country, weather, details, rain, wind, icon}) => {
    const [fahrenheit, setFahreneit] = useState("");
    const [convert, setConvert] = useState(false);
    
    function convertToFahrenheit (celcius) {
        return Math.round(celcius * 1.8 + 32) + " ºF";
    }
    
    function conversion () {
        setFahreneit(convertToFahrenheit(details.temp));
        setConvert(true)
    }

    function conversionCelsius () {
        setConvert(false)
    }

    function NoRain (attribute) {
        return !attribute ? <span></span> : <li><b>Rain: </b>{`${attribute} mm`}</li>;
    }
    
    return(
        <div className="widget-container">
        <div className="widget-header">
            <div className="main-description">
            <p className="city">{city}, {country.country}</p>
            <p className="weather-description">{weather}</p>
            </div>
        <img src={`http://openweathermap.org/img/wn/${icon.icon}@2x.png`} alt="icon-weather"></img>
        </div>
        <div className="weather-props">
            <div className="temperature-container">
            {convert ?
                <h1 className="temperature">{fahrenheit}</h1>
            :
                <h1 className="temperature">{Math.round(details.temp) + " ºC"}</h1>
            }
             {convert ? 
             <button onClick={conversionCelsius} className="converte-button">ºC</button> 
             : 
             <button onClick={conversion} className="converte-button">ºF</button>}   
            </div> 
            <div className="weather-details">
            <ul>
            <li><b>Temp Min: </b> 
                {convert ?
                <span>{fahrenheit} </span> 
                :
                <span> {Math.round(details.temp_min) + " ºC"}</span>  
            }
            </li>
            <li><b>Temp Max: </b>
                {convert ?
                <span>{fahrenheit} </span> 
                :
                <span> {Math.round(details.temp_max) + " ºC"}</span>  
                }
            </li>
            {NoRain(rain)}
            <li><b>Wind: </b>{wind.speed}m/s</li>
            <li><b>Humidity: </b>{details.humidity}%</li>
            <li><b>Pressure: </b>{details.pressure} hPa</li>
            </ul>
            </div>
        </div>
        </div>
        )
    }
    
    export default Widget;