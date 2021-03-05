import React, {useEffect, useRef} from "react";

function PageSlider({objectList, displayedValues, currentValue, maxValue, setCurrentValue}) {

	const refNavBackward = useRef(null)
	const refNavForward = useRef(null)

	const countSelection = Math.ceil(maxValue/(displayedValues === 0 ? 1 : displayedValues));
	const pageSelection = new Array(countSelection).fill('').map((_, i) => {
		let className = 'selector'
		if(i * displayedValues === currentValue) {
			className = 'selector active'
		}
		return(<div className={className} key={i} onClick={setCurrentValue.bind(null, i * displayedValues)}></div>)
	})

	const backwardClick = () => {
		if(currentValue < displayedValues) {
			setCurrentValue(0)
		} else {
			setCurrentValue(prevCurrentHour => prevCurrentHour - displayedValues)
		}
	}

	const forwardClick = () => {
		if(currentValue + displayedValues > maxValue - 1) {
			setCurrentValue(maxValue - displayedValues)
		} else {
			setCurrentValue(prevCurrentHour => prevCurrentHour + displayedValues)
		}
	}

	useEffect(() => {
		if(currentValue === 0) {
			if(!refNavBackward.current.classList.contains('hide')) {
				refNavBackward.current.classList.add('hide')
			}
		} else {
			if(refNavBackward.current.classList.contains('hide')) {
				refNavBackward.current.classList.remove('hide')
			}
		}
		if(currentValue + displayedValues === maxValue) {
			if(!refNavForward.current.classList.contains('hide')) {
				refNavForward.current.classList.add('hide')
			}
		} else {
			if(refNavForward.current.classList.contains('hide')) {
				refNavForward.current.classList.remove('hide')
			}
		}
	}, [currentValue, displayedValues, maxValue])

	return(
		<div className="hourly-panel">
			<div className="hourly-panel__container">
				<div ref={refNavBackward} className="nav nav-backward" onClick={backwardClick}></div>
				<div className="hourly-panel__row">
					{objectList}
				</div>
				<div ref={refNavForward} className="nav nav-forward" onClick={forwardClick}></div>
			</div>
			<div className="nav-selector">
				{pageSelection}
			</div>
		</div>
		);
}

export default PageSlider;