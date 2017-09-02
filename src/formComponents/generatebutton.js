import React from 'react';

export function GenerateButton (props) {
	return(
		<button id={props.id} onClick={props.handleClick}>
			{props.value}
		</button>
	);
}