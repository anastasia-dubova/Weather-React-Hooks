import React from "react"
import WeatherDaily from './WeatherDaily'

function WeatherDailyList ({weatherInfo, timezone_offset, countDaysDisplayed}) {
	const countDays = Math.min(countDaysDisplayed, weatherInfo.length);
	const WeatherDailyList = new Array(countDays-1).fill('').map((_, i) => {
		return(<WeatherDaily key={i+1} weatherInfo={weatherInfo[i+1]} timezone_offset={timezone_offset} />)
	})
	return(
		<div className="daily-panel">
			{WeatherDailyList}
		</div>
	);
}
export default WeatherDailyList;