import React from 'react';
import axios from 'axios';
import './calendar.css';

function getHolidaysForMonth(month, year, countryCode){
	const url ='https://holidayapi.com/v1/holidays?key=43da6ec1-0bf4-482f-b6c4-ff90df75f2e1&country='+countryCode+'&year='+year+'&month='+month;
	return axios.get(url)
	.then(function(response){ 
		return response.data.holidays; 
	})
	.catch(function(error) {
		if (error.response) {
		  return error.response;
		}
	});
}

function getDaysInMonth(month, year){
	return new Date(year, month, 0).getDate();
}

function calcRows(startDateNumber,endDateNumber,startWeekDay){
	let rows = 1;
	const maxRowLength = 7;
	let daysInBetween = endDateNumber - startDateNumber;
	while(daysInBetween !== 0){
		if(startWeekDay < maxRowLength){
			daysInBetween-=1;
			startWeekDay+=1;
		}else if(startWeekDay === maxRowLength){
			daysInBetween-=1;
			startWeekDay = 1;
			rows+=1;
		}
	}
	return rows;
}

function isHoliday(day, holidays = []){
	holidays.forEach(function(item) {
		if(new Date(item.date).getDate() === day)
			return true;
	});
	return false;
}

function CalendarMonthDates (props) {
		var rows=0,
			arrayForWeek = Array.apply(null, { length: 7 }).map(Number.call, Number),
			arrayForNumberOfRows,
			endDateNumber = 0,
			monthHolidays = null;
		const startDate = new Date(props.startDate);
		const endDate = new Date(props.endDate);
		let startDateNumber = startDate.getDate();
		let startDayOfWeek = props.startDay;
		//NOT WORKING TODO
		/*getHolidaysForMonth(startDate.getMonth()+1, startDate.getFullYear(), props.countryCode)
		.then(function(holidays){
			if(holidays !== undefined && holidays !== null){
				monthHolidays=holidays;
			}
		});*/
		if(startDate.getMonth() < endDate.getMonth()){
			endDateNumber=getDaysInMonth(startDate.getMonth()+1,startDate.getFullYear());
			rows = calcRows(startDateNumber,endDateNumber,startDayOfWeek+1);
		}else{
			endDateNumber=endDate.getDate();
			rows = calcRows(startDateNumber,endDateNumber,startDayOfWeek+1);
		}
		arrayForNumberOfRows = Array.apply(null, { length: rows }).map(Number.call, Number);
        return (
			<div className = "dates">
				{
					arrayForNumberOfRows.map(function (nRows, iRow) {
						return (
							<div className ="row" key={iRow+'Row'}>
								{
									arrayForWeek.map(function (nWeekDay, iWeekDay) {
										var isValidDate = startDateNumber > 0 && startDateNumber <= endDateNumber ;
										if(startDayOfWeek !== -1 && startDayOfWeek !== nWeekDay){
											return (
												<div className = "cell" id="gray" key={iRow+''+iWeekDay}>
												</div>
											);
										}else if(startDayOfWeek !== -1){
											startDayOfWeek = -1;
										}
										if (isValidDate) {
											var dateNumber = startDateNumber + 0;
											if(monthHolidays != null && isHoliday(dateNumber,monthHolidays)){
												startDateNumber++;
												return (
													<div className = "cell date" id="orange" key={iRow+''+iWeekDay}>
														{dateNumber}
													</div>
												); 
											}
											if(nWeekDay === 0 || nWeekDay === 6){
												startDateNumber++;
												return (
													<div className = "cell date" id="yellow" key={iRow+''+iWeekDay}>
														{dateNumber}
													</div>
												); 
											}
											startDateNumber++;
											return (
												<div className = "cell green date" id="green" key={iRow+''+iWeekDay}>
													{dateNumber}
												</div>
											);
										}
										return (
											<div className = "cell" id="gray" key={iRow+''+iWeekDay}>
											</div>
										);
									})
								}
							</div>
						);
					})
				}
			</div>
		);
}

export default CalendarMonthDates;