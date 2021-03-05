import React, {useState, useEffect, useRef} from "react"
import Error from "./Error"

function OpenWeatherMapApiKey ({error, setError, coordinates, initApiKey}) {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef(null)

	const changeHandler = e => {
		setInputValue(e.target.value)
		setError('')
	}

	const submitApiKey = (e) => {
		e.preventDefault()
		let apiKey = inputValue.trim();
		
		if(apiKey) {
			initApiKey(coordinates.lat, coordinates.lon, apiKey)
		} else {
			setError('Введите ключ API!')
		}
	}

	useEffect(() => {
		inputRef.current.focus();
	},[])

	return(
		<div className="api-key__container">
			<div className="api-key">
				<div className="api-key__title">
					Введите API-ключ для доступа к данным о погоде на сайте openweathermap.org
				</div>
				<form className="api-key__form" onSubmit={submitApiKey}>
					<input ref={inputRef} type='text' name='apiKey' placeholder='API Key' value={inputValue} onChange={changeHandler} />
					<button>Применить</button>
				</form>
				<div className="api-key__error">
					<Error message={error} />
				</div>
			</div>
		</div>
		);
}

export default OpenWeatherMapApiKey;