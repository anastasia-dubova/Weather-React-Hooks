const getDataFromWeatherByCityName = (cityName, key) => {
	if(!key) return null;
	return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&q=${cityName}&appid=${key}`)
	.then(response => {return response.json()})
	.catch(reject => {return ({message: `${reject.name}: ${reject.message}`})})
}

const getDataFromWeatherByGeographicCoordinates = (lat, lon, key) => {
	if(!key) return null;
	return fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&lat=${lat}&lon=${lon}&appid=${key}`)
	.then(response => {return response.json()})
	.catch(reject => {return ({message: `${reject.name}: ${reject.message}`})})
}

const getDataFromOnecallByGeographicCoordinates = (lat, lon, key) => {
	if(!key) return null;
	return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=ru&appid=${key}`)
	.then(response => {return response.json()})
	.catch(reject => {return ({message: `${reject.name}: ${reject.message}`})}) //TypeError: Failed to fetch object
}

export {getDataFromWeatherByCityName, getDataFromWeatherByGeographicCoordinates, getDataFromOnecallByGeographicCoordinates};