import React from 'react';
import CalendarHeader from './calendarheader.js';
import CalendarWeekDays from './calendarweekdays.js';
import './calendar.css';

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["S","M","T","W","T","F","S"];

export class Calendar extends React.Component {

	addDays(date, days){
		var result = new Date(date);
		var newDate = result.getDate()+parseInt(days,10);
	  	result.setDate(newDate);
	  	return result;
	}

	render(){
		const propsDate = new Date(this.props.date);
		const startDate = this.addDays(propsDate,1);
		const startYear = startDate.getFullYear();
		const startMonth = startDate.getMonth();	
		return (
			<div className="calendarDiv">
				 <div className="calendar">
					<div>
						<CalendarWeekDays dayNames={days} />
						<CalendarHeader monthNames={months} monthIndex={startMonth} year={startYear} />
					</div>
				</div>
			</div>
		);
	}
}