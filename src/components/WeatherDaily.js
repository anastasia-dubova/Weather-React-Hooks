import React from "react"
import {getDate, getDayOfWeek} from "./AdditionalFunction"

function WeatherDaily (props) {
	return(
		<div className="daily-panel__container">
			<div className="daily-panel__item">
				<div>{getDayOfWeek(props.weatherInfo.dt, props.timezone_offset)}</div>
				<div>{getDate(props.weatherInfo.dt, props.timezone_offset)}</div>
				<div><img src={`http://openweathermap.org/img/wn/${props.weatherInfo.weather[0].icon}@2x.png`} alt={props.weatherInfo.weather[0].description}/></div>
				<div>днём: {props.weatherInfo.temp.day > 0 ? "+" : ""}{props.weatherInfo.temp.day}&#176;C</div>
				<div>ночью: {props.weatherInfo.temp.night > 0 ? "+" : ""}{props.weatherInfo.temp.night}&#176;C</div>
				<div>{props.weatherInfo.weather[0].description}</div>
			</div>
		</div>
		);
}
export default WeatherDaily;