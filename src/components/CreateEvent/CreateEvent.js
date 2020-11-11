import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class CreateEvent extends Component {
	state = {
        eventName: '',
        eventAcronym: '',
        eventWebsite: '',
        eventRegistration: '',
        eventOAuth: '',
        campaignStart: '',
        campaignEnd: '',
	};

	

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	render() {
        console.log('this state:', this.state);
		return (
			<form className='formPanel' onSubmit={this.login}>
				<h2>Create Event</h2>
				
				<div>
					<label htmlFor='eventName'>
						Event Name:
						<input
							type='text'
							name='eventName'
							required
							value={this.state.eventName}
							onChange={this.handleInputChangeFor("eventName")}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='eventAcronym'>
						Event Acronym:
						<input
							type='text'
							name='eventAcronym'
							required
							value={this.state.eventAcronym}
							onChange={this.handleInputChangeFor("eventAcronym")}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='eventWebsite'>
						Event Website:
						<input
							type='text'
							name='eventWebsite'
							required
							value={this.state.eventWebsite}
							onChange={this.handleInputChangeFor("eventWebsite")}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='eventRegistration'>
						Event Registration:
						<input
							type='text'
							name='eventRegistration'
							required
							value={this.state.eventRegistration}
							onChange={this.handleInputChangeFor("eventRegistration")}
						/>
					</label>
				</div> 
				<div>
					<label htmlFor='eventOAuth'>
						Event OAuth:
						<input
							type='text'
							name='eventOAuth'
							required
							value={this.state.eventOAuth}
							onChange={this.handleInputChangeFor("eventOAuth")}
						/>
					</label>
				</div>     
				<div>
					<label htmlFor='campaignStart'>
						Campaign Start:
						<input
							type='date'
							name='campaignStart'
							required
							value={this.state.campaignStart}
							onChange={this.handleInputChangeFor("campaignStart")}
						/>
					</label>
				</div>         
				<div>
					<label htmlFor='campaignEnd'>
						Campaign End:
						<input
							type='date'
							name='campaignEnd'
							required
							value={this.state.campaignEnd}
							onChange={this.handleInputChangeFor("campaignEnd")}
						/>
					</label>
				</div>                                                          

				<div>
					<input className='btn' type='submit' name='submit' value='Create Event' />
				</div>
			</form>
		);
	}
}

export default connect(mapStoreToProps)(CreateEvent);