import React from 'react';
import CalendarHeader from './calendarheader.js';
import CalendarWeekDays from './calendarweekdays.js';
import CalendarMonthDates from './calendarmonthdates.js'
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
	
	getFullInBetweenMonths(startDate, endDate) {
	    var months;
	    months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
	    months -= startDate.getMonth() + 1;
	    months += endDate.getMonth();
	    return months <= 0 ? 0 : months;
	}

	render(){
		const propsDate = new Date(this.props.date);
		const startDate = this.addDays(propsDate,1);
		const startYear = startDate.getFullYear();
		const startMonth = startDate.getMonth();	
		const startDayOfWeek = startDate.getDay();
		const startDateNumber = startDate.getDate();
		const countryCode = this.props.countryCode;
		const daysToShow = parseInt(this.props.daysToShow,10)-1;
		const endDate = this.addDays(startDate,daysToShow);
		//TO SHOW MULTIPLE CALENDARS TODO
		const numberOfCalendars = endDate.getFullYear() === startYear && endDate.getMonth() === startMonth?1:this.getFullInBetweenMonths(startDate,endDate)+2;
		const arrayForNumberOfCalendars = Array.apply(null, { length: numberOfCalendars }).map(Number.call, Number);
        
		return (
			<div className="calendarDiv">
				 <div className="calendar">
					<div>
						<CalendarWeekDays dayNames={days} />
						<CalendarHeader monthNames={months} monthIndex={startMonth} year={startYear} />
						<CalendarMonthDates countryCode={countryCode} startDate={startDate} endDate={endDate} startDateNumber={startDateNumber} startDay={startDayOfWeek} />
					</div>
				</div>
			</div>
		);
	}
}