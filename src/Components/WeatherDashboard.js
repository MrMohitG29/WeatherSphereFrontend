import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContext';
import config from './Config';
import History from './History';
import Favorite from './Favorite';
import genericApiCall from './GenericApi';
import Spinner from './Spinner';


const WeatherDashboard = () => {
  const { searchTerm } = useAppContext();
  const [weatherData, setWeatherData] = useState(null);
  const [isFavorite, setIsFavoriteCity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleApiResponse = (completeData) => {
    setIsLoading(false);
    const data = completeData.data;
    setIsFavoriteCity(completeData.isFavoriteCity);

    if (data.cod === '404' || data.cod === '400') {
      throw new Error(data.message);
    }

    setWeatherData(data);
  };

  const fetchWeatherData = () => {
    setIsLoading(true);
    genericApiCall({ endpoint: 'weather', method: 'GET', searchTerm: searchTerm, callback: handleApiResponse });
  };

  const addToFavorite = () => {
    setIsFavoriteCity(true);
    genericApiCall({ endpoint: 'favorite-cities', method: 'POST', searchTerm: searchTerm, callback: {} });
  };

  useEffect(fetchWeatherData, [searchTerm]);

  const renderWeatherForecast = () => {
    if (!weatherData || !weatherData.list) {
      return <p className="card-text">No weather data available</p>;
    }

    const uniqueDates = {};

    return weatherData.list.map((item) => {
      const dateTime = new Date(item.dt * 1000);
      const date = dateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

      if (!uniqueDates[date]) {
        uniqueDates[date] = true;

        const time = dateTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

        return (
          <div key={item.dt} className="card transparent-card my-2">
            <div className="card-body">
              <h5 className="card-title">{date}</h5>
              <p className="card-text">Temperature: {item.main.temp} &#8451;</p>
              <p className="card-text">Weather: {item.weather[0].description}</p>
              <p className="card-text">Humidity: {item.main.humidity}</p>
              <p className="card-text">Wind Speed: {item.wind.speed}</p>
            </div>
          </div>
        );
      }
      return null;
    });
  };


  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  };


  const getCurrentDayAndDate = () => {
    const now = new Date();
    return now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const BasicWeatherInfo = ({ main }) => (
    <div>
      <p className="card-text">Temperature: {main.temp} &#8451;</p>
      <p className="card-text">Min Temperature: {main.temp_min} &#8451;</p>
      <p className="card-text">Max Temperature: {main.temp_max} &#8451;</p>
    </div>
  );


  const AdditionalWeatherDetails = ({ clouds, main, wind, visibility }) => (
    <div>
      <p className="card-text">Cloud Cover: {clouds.all}%</p>
      <p className="card-text">Humidity: {main.humidity}%</p>
      <p className="card-text">Pressure: {main.pressure} hPa</p>
      <p className="card-text">Wind Speed: {wind.speed} m/s</p>
      <p className="card-text">Visibility: {visibility} meters</p>
    </div>
  );

  return (
    <div className='m-5'>
      {isLoading && <Spinner/>}
      <div className='d-flex justify-content-between'>
        {localStorage.getItem('accessToken') ? (
          <>
            <History />
            <Favorite />
          </>
        ) : ""}
      </div>
      <center>
        <h1>{weatherData ? (`${weatherData.city.name}, ${weatherData.city.country}`) : "Weather Information"}</h1>
        {localStorage.getItem('accessToken') ? (
          <>
            <button
              className='btn btn-sm btn-outline-dark'
              onClick={addToFavorite}
              disabled={isFavorite}
            >
              {isFavorite ? 'Already in Favorites' : 'Add to Favorite'}
            </button>
          </>
        ) : ""}
      </center>



      <div className='d-flex justify-content-evenly my-4'>
        {/* Card 1: Basic Weather Information */}
        <div className="mx-3 card transparent-card">
          <div className="card-body">
            {weatherData ? (
              <>
                <center>
                  <h1 className='no-margin'>{getCurrentTime()}</h1>
                  <p>{getCurrentDayAndDate()}</p>
                </center>
                <BasicWeatherInfo main={weatherData.list[0].main} />
              </>
            ) : (
              <p className="card-text">No weather data available</p>
            )}
          </div>
        </div>

        {/* Card 2: Additional Weather Details */}
        <div className="card transparent-card">
          <div className="card-body">
            <h5 className="card-title"><strong>Additional Details</strong></h5>
            {weatherData ? (
              <AdditionalWeatherDetails
                clouds={weatherData.list[0].clouds}
                main={weatherData.list[0].main}
                wind={weatherData.list[0].wind}
                visibility={weatherData.list[0].visibility}
              />
            ) : null}
          </div>
        </div>
      </div>

      <div className="card transparent-card">
        <div className="card-body">
          <h5 className="card-title"><strong>5-Day Weather Forecast</strong></h5>
          {renderWeatherForecast()}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
