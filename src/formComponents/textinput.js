import React from 'react';

export function TextInput (props) {
	return(
		<input type="text" id={props.id} style={{textTransform : 'uppercase'}} value ={props.value} onChange={props.onChange} required>
		
		</input>
	);
}