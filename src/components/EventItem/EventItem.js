import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import {withRouter} from 'react-router-dom';

class EventItem extends Component {
	state = {
        
	};

	
  

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	eventClick = (event) => {
		console.log('this event was clicked', event.id);
		this.props.dispatch({
			type: 'SET_TEMP',
			payload: event,
		});
		this.editEventNav();
	}

	editEventNav = () => {
		this.props.history.push('/editevent')
	}

	render() {
		console.log("this is our state:", this.state);
		console.log('EventItem props:', this.props);
		return (
			<div id="eventItemDiv" onClick={() => this.eventClick(this.props.event)}>
                <h1>{this.props.event.name}</h1>
                <h1>{this.props.event.acronym}</h1>
                <img src='x'></img>
                <h1>{this.props.event.website}</h1>
                <label htmlFor='campaignStart'>
						Campaign Start:<br/>
						<input
							type='date'
							name='campaignStart'
							required
							value={this.props.event.start_date.split('T', 1)[0]}
							onChange={this.handleInputChangeFor("campaignStart")}
						/>
					</label>
					<label htmlFor='campaignEnd'>
						Campaign End:<br/>
						<input
							type='date'
							name='campaignEnd'
							required
							value={this.props.event.end_date.split('T', 1)[0]}
							onChange={this.handleInputChangeFor("campaignEnd")}
						/>
					</label>

                    
            </div>
		);
	}
}

export default connect(mapStoreToProps)(withRouter(EventItem));
