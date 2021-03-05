import React from "react";

function Error({message}) {

	return(
		<>
			{message &&
				<div className="error">
						{message}
				</div>}
		</>
		);
}

export default Error;