import React from "react";

function Info ({city}) {

	return(
		<div className="header__info">
			<div>Прогноз погоды</div>
			<div className="header__city">{city}</div>
		</div>
	);
}

export default Info;