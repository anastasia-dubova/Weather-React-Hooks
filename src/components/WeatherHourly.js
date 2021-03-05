import React from "react";
import {getDate, getTime} from "./AdditionalFunction";

function WeatherHourly ({weatherInfo, timezone_offset}) {
	return(
		<div className="hourly-panel__item">
			<div>{getDate(weatherInfo.dt, timezone_offset)} {getTime(weatherInfo.dt, timezone_offset)}</div>
			<div className="sm"><img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} title={weatherInfo.weather[0].description} alt={weatherInfo.weather[0].description}/></div>
			<div className="xs"><img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`} title={weatherInfo.weather[0].description} alt={weatherInfo.weather[0].description}/></div>
			<div>{weatherInfo.temp > 0 ? "+" : ""}{weatherInfo.temp}&#176;C</div>
		</div>
		);
}
export default WeatherHourly;