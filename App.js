import React from "react";
import SunriseImage from "./Assets/ForestSunrise.jpg";
import Suncloud from "./Assets/SunandCloud.svg";
import "./index.css";
import Card from "./Card";
import { useState, useEffect } from "react";

const App = () => {
  const [city, setcity] = useState("Mumbai");
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  // console.log(city);

  const fetchWeather = async () => {
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=${location.long}&lat=${location.lat}&units=metrics&lang=en`;

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

  const fetchWeatherByCity = async () => {
    const url = `https://weatherbit-v1-mashape.p.rapidapi.com/current?city=${city}&units=metrics&lang=en`;

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
  function locationSuccess(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat + " " + long);
    setLocation({ lat, long });
  }
  function locationFail(err) {
    console.error("Something went wrong while accessing the location");
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
    }
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeather();
      console.log(1);
    }
  }, [location]);

  // fetchWeather();
  return (
    <div className="parent">
      <div className="mainbox">
        <div className="contentBox">
          {weatherData && <h1>{weatherData.data[0].city_name}</h1>}
          {weatherData && <p>{weatherData.data[0].temp}°C</p>}
          {/* {true && <h1>{"Mumbai"}</h1>}
          {true && <p>{36}°C</p>} */}
          <img src={Suncloud} alt="weatherICON" width={"40%"} height={"40%"} />
          <div className="cardParent">
            {weatherData && (
              <Card
                weatherType="Humidity"
                weatherValue={weatherData.data[0].rh}
                units="%"
              />
            )}
            {weatherData && (
              <Card
                weatherType="WindSpeed"
                weatherValue={weatherData.data[0].wind_spd}
                units="Km/Hr"
              />
            )}
          </div>
        </div>
        <div className="searchBox">
          <input
            type="textbox"
            onChange={(e) => setcity(e.target.value)}
          ></input>
          <button
            onClick={fetchWeatherByCity}
            style={{
              padding: "10px 20px",
              backgroundColor: "white",
              color: "Black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
