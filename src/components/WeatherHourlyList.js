import React from "react"
import WeatherHourly from "./WeatherHourly"
import PageSlider from "./PageSlider.js"

function WeatherHourlyList ({weatherInfo, timezone_offset, countHoursDisplayed, currentHour, setCurrentHour}) {

	const countHours = Math.min(countHoursDisplayed, weatherInfo.length)
	const WeatherHourlyList = new Array(countHours).fill('').map((_, i) => {
		return(<WeatherHourly key={currentHour + i} weatherInfo={weatherInfo[currentHour + i]} timezone_offset={timezone_offset} />)
	})

	return(
		<PageSlider objectList={WeatherHourlyList} displayedValues={countHours} currentValue={currentHour} maxValue={weatherInfo.length} setCurrentValue={setCurrentHour} />
	)
}
export default WeatherHourlyList