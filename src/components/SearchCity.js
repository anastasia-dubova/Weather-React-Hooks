import React, {useState, useEffect, useRef} from "react";

function SearchCity ({weatherMethod, setError}) {
	const [inputValue, setInputValue] = useState('')
	const inputRef = useRef(null)

	const changeHandler = e => {
		setInputValue(e.target.value)
		setError('')
	}

	const submitCity = (e) =>{
		e.preventDefault()

		let city = inputValue.trim();

		if(city) {
			weatherMethod(city)
		} else {
			setError('Введите название города!')
		} 
		
	}

	useEffect(() => {
		inputRef.current.focus();
	},[])
	
	return(
		<form className="header__search" onSubmit={(e) => submitCity(e)}>
			<input ref={inputRef} type='text' name='city' placeholder='Город' value={inputValue} onChange={changeHandler}/>
			<button>Получить погоду</button>
		</form>
		);
}

export default SearchCity;