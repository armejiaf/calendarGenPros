import React from 'react';

export function NumberInput (props) {
	return(
		<input type="number" id={props.id} min="0" value ={props.value} onChange={props.onChange} required>
		
		</input>
	);
}