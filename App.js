import React from "react";
import SunriseImage from "./Assets/ForestSunrise.jpg";
import "./index.css";
import Card from "./Card";
import { useState, useEffect } from "react";

const App = () => {
  const [city, setcity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  // console.log(city);
  const fetchWeather = async () => {
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?city=${city}&units=metric&lang=en`;

    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c65cff5393msh3883091d2818b49p14b2adjsnc602f04e41ee",
        "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  // fetchWeather();
  return (
    <div className="parent">
      <div className="mainbox">
        <div className="contentBox">
          {weatherData && <h1>{weatherData.data[0].city_name}</h1>}
          {weatherData && <p>{weatherData.data[0].temp} C</p>}
          <div className="cardParent">
            <Card
              weatherType="Humidity"
              weatherValue={weatherData.data[0].rh}
            />
            <Card
              weatherType="WindSpeed"
              weatherValue={weatherData.data[0].wind_spd}
            />
          </div>
        </div>
        <div className="searchBox">
          <input
            type="textbox"
            onChange={(e) => setcity(e.target.value)}
          ></input>
          <button
            onClick={fetchWeather}
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default App;
