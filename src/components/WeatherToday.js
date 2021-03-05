import React from "react";
import {getDate, getTime, getDayOfWeek, convertHpaToMmhg} from "./AdditionalFunction";

function WeatherToday (props) {

	return(
		<div className="today-panel__data">
			<div className="today-panel__row">
				<div className="today-panel__column">
					<div className="today-info">{getDate(props.weatherInfo.dt, props.timezone_offset)}</div>
					<div className="today-info">{getTime(props.weatherInfo.dt, props.timezone_offset)}</div>
					<div className="today-info">{getDayOfWeek(props.weatherInfo.dt, props.timezone_offset)}</div>
				</div>
			</div>
			<div className="today-panel__row">
				<div className="today-panel__container-main">
					<div className="today-panel__container">
						<div className="temperature">{props.weatherInfo.temp > 0 ? "+" : ""}{props.weatherInfo.temp}&#176;C</div>
					</div>
					<div className="today-panel__container today-img"><img className="today-icon" src={`http://openweathermap.org/img/wn/${props.weatherInfo.weather[0].icon}@4x.png`} alt={props.weatherInfo.weather[0].description} /></div>
					<div className="today-panel__column">
						<div className="today-panel__container">{props.weatherInfo.weather[0].description}</div>
						<div className="today-panel__container">ощущается как {props.weatherInfo.feels_like > 0 ? "+" : ""}{props.weatherInfo.feels_like}&#176;C</div>
					</div>
				</div>
			</div>
			<div className="today-panel__row">
				<div className="today-panel__item">
					<img className="weather-icon" src={require("../img/wind.svg")} alt="Ветер" />
					<span> {props.weatherInfo.wind_speed} м/с</span>
					<img className="weather-icon" src={require("../img/wind_arrow.svg")} style={{transform: `rotate(${props.weatherInfo.wind_deg + 180}deg)`}} alt="Направление ветра" />
				</div>
				<div className="today-panel__item">
					<img className="weather-icon" src={require("../img/humidity.svg")} alt="Влажность" />
					<span>{props.weatherInfo.humidity}%</span>
				</div>
				<div className="today-panel__item">
					<img className="weather-icon" src={require("../img/pressure.svg")} alt="Давление" />
					<span>{Math.round(convertHpaToMmhg(props.weatherInfo.pressure))} мм рт ст</span>
				</div>
			</div>
			<div className="today-panel__row">
				<div className="today-panel__container">
					<div className="today-panel__item">Восход: {getTime(props.weatherInfo.sunrise, props.timezone_offset)}</div>
					<div className="today-panel__item">Закат: {getTime(props.weatherInfo.sunset, props.timezone_offset)}</div>
					<div className="today-panel__item">Облачность: {props.weatherInfo.clouds} %</div>
					<div className="today-panel__item">Точка росы: {props.weatherInfo.dew_point}&#176;C</div>
					<div className="today-panel__item">UV-индекс: {props.weatherInfo.uvi} </div>
					<div className="today-panel__item">Видимость: {props.weatherInfo.visibility} м</div>
				</div>
			</div>
		</div>
		);
}
export default WeatherToday;