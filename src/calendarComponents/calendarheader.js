import React from 'react';
import './calendar.css';

function CalendarHeader (props) {
	return(
		<div className="row head">
			<div className="cell title">{props.monthNames[props.monthIndex]}&nbsp;{props.year}</div>
		</div>
	);
}
export default CalendarHeader;