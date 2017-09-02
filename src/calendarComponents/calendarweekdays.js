import React from 'react';
import './calendar.css';

function CalendarWeekDays (props) {
	 return (
        <div className="row weekdays">
            {props.dayNames.map(function (item, i) {
                return (
                    <div className="cell" key={i.toString()}>{item}</div>
                );
            })}
        </div>
    );
}

export default CalendarWeekDays;