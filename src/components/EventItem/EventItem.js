import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class EventItem extends Component {
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
			<div id="eventItemDiv">
                <h1>event name</h1>
                <h1>event acronym</h1>
                <img src='x'></img>
                <h1>event website</h1>
                <label htmlFor='campaignStart'>
						Campaign Start:<br/>
						<input
							type='date'
							name='campaignStart'
							required
							value={this.state.campaignStart}
							onChange={this.handleInputChangeFor("campaignStart")}
						/>
					</label>
                    <br/>
					<label htmlFor='campaignEnd'>
						Campaign End:<br/>
						<input
							type='date'
							name='campaignEnd'
							required
							value={this.state.campaignEnd}
							onChange={this.handleInputChangeFor("campaignEnd")}
						/>
					</label>
            </div>
		);
	}
}

export default connect(mapStoreToProps)(EventItem);
