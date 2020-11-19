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
		image: ''
	};

	checkFields = () => {
		//console.log('checking fields');
		if(this.state.eventName === '' || this.state.campaignStart === '' || this.state.campaignEnd === ''){
			alert('Fill all required fields');
		}else{
			this.createEvent();
		}
	}

	createEvent=()=>{
		console.log('creating event');
		this.props.dispatch({
			type: 'CREATE_EVENT',
			payload: {
				eventName: this.state.eventName,
				eventAcronym: this.state.eventAcronym,
				eventWebsite: this.state.eventWebsite,
				eventRegistration: this.state.eventRegistration,
				eventOAuth: this.state.eventOAuth,
				campaignStart: this.state.campaignStart,
				campaignEnd: this.state.campaignEnd,
				image: this.state.image
			}
			
		});

		alert('Event Created!')
		this.props.history.push('/user')//need condition to check if event was created 
	}

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	render() {
        console.log('this state:', this.state);
		return (
         // <form className='formPanel' onSubmit={this.createEvent}>
         <div className="createEvent">
				<h2>Create Event</h2>
				
				<div>
					<label htmlFor='eventName'>
						Event Name:
						<input
							className="requiredInput"
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
					<label htmlFor='image'>
						Event Image URL (255 characters or less):
						<input
							type='text'
							name='image'
							required
							value={this.state.image}
							onChange={this.handleInputChangeFor("image")}
						/>
					</label>
				</div> 
				{/* <div>
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
				</div>      */}
				<div>
					<label htmlFor='campaignStart'>
						Campaign Start:
						<input
							className="requiredInput"
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
							className="requiredInput"
							type='date'
							name='campaignEnd'
							required
							value={this.state.campaignEnd}
							onChange={this.handleInputChangeFor("campaignEnd")}
						/>
					</label>
				</div>                                                          
				<p className="required">required</p>
				<div>
					{/* <input className='btn' type='submit' name='submit' value='Create Event' /> */}
				<button onClick={this.checkFields}>Create Event</button>
            </div>
         </div>
			// </form>
		);
	}
}

export default connect(mapStoreToProps)(CreateEvent);
