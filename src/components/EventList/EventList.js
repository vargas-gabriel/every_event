import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import EventItem from '../EventItem/EventItem';

class EventList extends Component {
	state = {
        
	};

	
  

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	render() {
		//console.log("this is our state:", this.state);
		//console.log('EventList props:', this.props);
		const orderedEvents =  this.props.store.userEvent
		console.log('orderedEvents', orderedEvents)
		return (
			<div>
				{this.props.store.userEvent.map(event => 
					<EventItem key={event.id} event={event}/>
				)}
         </div>
		);
	}
}

export default connect(mapStoreToProps)(EventList);
