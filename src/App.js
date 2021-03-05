import React, {useState, useEffect, useRef} from 'react'
import OpenWeatherMapApiKey from './components/OpenWeatherMapApiKey'
import Info from './components/Info'
import SearchCity from './components/SearchCity'
import WeatherToday from './components/WeatherToday'
import WeatherMap from './components/WeatherMap'
import WeatherHourlyList from './components/WeatherHourlyList'
import WeatherDailyList from './components/WeatherDailyList'
import Error from './components/Error'
import './App.css'
import {getDataFromWeatherByCityName, getDataFromWeatherByGeographicCoordinates, getDataFromOnecallByGeographicCoordinates} from "./components/DataRequestFunction"

function App() { //'a3cc488aa673730c8354dd39912b5cde';
	const [error, setError] = useState('')
	const [coordinates, setCoordinates] = useState({lat: 55.15, lon: 61.43})
	const apiKey = useRef(sessionStorage.getItem('api-key'))
	const needCityName = useRef(false)
	const [city, setCity] = useState('Челябинск')
	const [data, setData] = useState({})
	const [setting, setSetting] = useState({countDaysDisplayed: 5, countHoursDisplayed: 3})
	const [currentHour, setCurrentHour] = useState(0)

	const searchGeographicCoordinatesByCityName = async (cityName, key = apiKey.current) => {
		let err = ''
		let info = await getDataFromWeatherByCityName(cityName, key)
		if(info.message) {
			setError(`${info.cod ? `Код ошибки: ${info.cod}, ` : ''} ${info.message} `)
		} else {
			needCityName.current = false
			if(info.coord.lat && info.coord.lon && info.name) {
				if(typeof(info.coord.lat) === 'number' && typeof(info.coord.lat) === 'number') {
					setCoordinates({lat: info.coord.lat, lon: info.coord.lon})
				} else {
					err = 'Неверный тип данных'
				}
				setCity(info.name)
			} else {
				err = 'Данные не найдены (searchGeographicCoordinatesByCityName)'
			}
			setError(err)
		}
	}

	const setDataByGeographicCoordinates = async (lat = coordinates.lat, lon = coordinates.lon, key = apiKey.current) => {
		if(key) {
			let info = await getDataFromOnecallByGeographicCoordinates(lat, lon, key)

			if(info && info.message) {
				setError(`${info.cod ? `Код ошибки: ${info.cod}, ` : ''} ${info.message} `)
				setData({})
				return false
			} else {
				if(!apiKey.current) {
					apiKey.current = key
					sessionStorage.setItem('api-key', key)
				}
				setError('')
				setData({...info})
				if(needCityName.current) {
					let info = await getDataFromWeatherByGeographicCoordinates(lat, lon, key)
					if(info.message) {
						setError(`${info.cod ? `Код ошибки: ${info.cod}, ` : ''} ${info.message} `)
					} else {
						if(info.name) {
							setCity(info.name)
						} else {
							setError('Данные не найдены (setDataByGeographicCoordinates)')
						}
					}
				}

				return true
			}
		}
	}

	useEffect(() => {
		if(apiKey.current) {
			setDataByGeographicCoordinates(coordinates.lat, coordinates.lon, apiKey.current)
		}
	}, [])

	useEffect(() => {
		console.log('Coordinates:', coordinates)
		setCurrentHour(0)
		setDataByGeographicCoordinates()
	}, [coordinates.lat, coordinates.lon])
	
	useEffect(() => {
		//needCityName.current = false
		setDataByGeographicCoordinates(coordinates.lat, coordinates.lon)
	}, [currentHour])

	return(
		<div className="wrapper">
			{!apiKey.current &&
				<OpenWeatherMapApiKey error={error} setError={setError} coordinates={coordinates} initApiKey={setDataByGeographicCoordinates} />
			}
			{apiKey.current &&
				<div className="container">
					<div className="main-panel">
						<Error message={error} />
						<div className="header">
							<Info city={city} />
							<SearchCity weatherMethod={searchGeographicCoordinatesByCityName} setError={setError} />
						</div>
						<div className="current-panel">
							{data.current &&
								<div className="today-panel">
									<WeatherToday weatherInfo={data.current} timezone_offset={data.timezone_offset} />
									<WeatherMap lat={coordinates.lat} lon={coordinates.lon} selectNewPlace={setCoordinates} needCityName={needCityName} />
								</div>
							}
							<div className="bottom_line"></div>
							{data.hourly &&
								<WeatherHourlyList weatherInfo={data.hourly} timezone_offset={data.timezone_offset} countHoursDisplayed={setting.countHoursDisplayed} currentHour={currentHour} setCurrentHour={setCurrentHour} />
							}
						</div>
					</div>
					{data.daily &&
						<WeatherDailyList weatherInfo={data.daily} timezone_offset={data.timezone_offset} countDaysDisplayed={setting.countDaysDisplayed} />
					}
				</div>
			}
		</div>
	)
}

export default App;