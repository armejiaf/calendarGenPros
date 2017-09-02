import React from 'react';

export function DateInput (props) {
	return(
		<input type="date" id={props.id} value ={props.value} onChange={props.onChange} required>
		
		</input>
	);
}