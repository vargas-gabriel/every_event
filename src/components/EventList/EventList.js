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
		console.log("this is our state:", this.state);
		return (
			<div>
                <EventItem/>
            </div>
		);
	}
}

export default connect(mapStoreToProps)(EventList);
