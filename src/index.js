import React from 'react';
import ReactDOM from 'react-dom';
import {Calendar} from './calendarComponents/calendar.js';
import {Label} from './formComponents/label.js';
import {TextInput} from './formComponents/textinput.js';
import {DateInput} from './formComponents/dateinput.js';
import {NumberInput} from './formComponents/numberinput.js';
import {GenerateButton} from './formComponents/generatebutton.js';
import './index.css';

const countryCodeArray = ["AR","AO","AT","AU","AW","AX","BA","BE","BG","BO","BR","BS",
"CA","CH","CN","CO","CR","CU","CZ","DE","DK","DO","EC","ES","FI","FR","GB","GB-ENG","GB-NIR",
"GB-SCT","GB-WLS","GR","GT","HK","HN","HR","HU","ID","IE","IN","IL","IS","IT","JP","KZ","LS",
"LU","MG","MQ","MT","MU","MX","MZ","NG","NL","NO","PE","PK","PH","PL","PR","PT","PY","RE","RO",
"RU","SC","SE","SG","SI","ST","SK","TN","TR","UA","US","UY","VE","ZA","ZW"];

class Form extends React.Component {
	constructor(){
		super();
		this.state = {
			buttonIsClicked: false,
			date: "",
			countryCode: "",
			daysToShow: 0
		};
		this.handleDateChange = this.handleDateChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleNumberChange = this.handleNumberChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
 	handleDateChange(event) {
    	this.setState({date: event.target.value});
  	}
  	handleClick(event) {
    	return false;
  	}
	handleNumberChange(event) {
    	this.setState({daysToShow: event.target.value});
  	}
  	handleTextChange(event) {
  		const cc = event.target.value;
    	this.setState({countryCode: cc.toUpperCase()});
  	}
  	handleSubmit(event) {
  		if(countryCodeArray.indexOf(this.state.countryCode) >= 0) {
  			this.setState({buttonIsClicked: true});
  			document.getElementById('numberinput').setAttribute("disabled","disabled");
  			document.getElementById('textinput').setAttribute("disabled","disabled");
  			document.getElementById('button').setAttribute("disabled","disabled");
  			event.preventDefault();
		}else{
			alert('Invalid country code: ' + this.state.countryCode);
    		event.preventDefault();
		}
	}
	render(){
		return(
			<div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<table>
						<tbody>
							<tr>
								<td>
									<Label value="Start Date: " />
								</td>
								<td>
									<DateInput id="dateinput" onChange={this.handleDateChange} value={this.state.date}/>
								</td>
							</tr>
							<tr>
								<td>
									<Label value="Days: "/>
								</td>
								<td>
									<NumberInput id="numberinput" onChange={this.handleNumberChange} value={this.daysToShow}/>
								</td>
							</tr>
							<tr>
								<td>
									<Label value="Country Code: "/>
								</td>
								<td>
									<TextInput id="textinput" onChange={this.handleTextChange} value={this.countryCode}/>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<GenerateButton id="button" onClick={this.handleClick} value="Generate Calendar"/>
								</td>
							</tr>
						</tbody>
						</table>
					</form>
				</div>
				<br/>
				<div>
				 	{
				 		this.state.buttonIsClicked ? 
				 		<Calendar date={this.state.date} countryCode={this.state.countryCode} daysToShow={this.state.daysToShow}/> : 
				 		null
				 	}
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<Form/>,
	document.getElementById('root')
);