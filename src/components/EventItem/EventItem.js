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
			type: 'SET_TEMP',//active event
			payload: event,
		});
		this.editEventNav(event);
	}

	editEventNav = (event) => {
		//console.log('event', event);
		this.props.history.push(`/editevent/${event.id}`)
	}

	render() {
		//console.log("this is our state:", this.state);
		console.log('EventItem props:', this.props.event.event_image);
		return (
			<div id="eventItemDiv" onClick={() => this.eventClick(this.props.event)}>
					<h2 className="centered">{this.props.event.name}</h2>
					<h3 className="centered">{this.props.event.acronym}</h3>
					{this.props.event.event_image === null ?
						<img className="centeredImage" src='data:image/png;base64,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' width='150px'></img>
						:
						<img className="centeredImage" src={this.props.event.event_image} width='150px'></img>
					}
					<h3 className="centered">{this.props.event.website}</h3>
					<h4 className="centered">Campaign Start</h4>
					<input
						className="centeredImage"
						type='date'
						name='campaignStart'
						required
						disabled
						value={this.props.event.start_date.split('T', 1)[0]}
						onChange={this.handleInputChangeFor("campaignStart")}
					/>
					<h4 className="centered">Campaign End</h4>
					<input
						className="centeredImage"
						type='date'
						name='campaignEnd'
						required
						disabled
						value={this.props.event.end_date.split('T', 1)[0]}
						onChange={this.handleInputChangeFor("campaignEnd")}
					/>

                    
            </div>
		);
	}
}

export default connect(mapStoreToProps)(withRouter(EventItem));
