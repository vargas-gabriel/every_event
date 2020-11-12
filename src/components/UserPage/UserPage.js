import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

class UserPage extends Component {
	state = {
		hour: null,
		greeting: "",
	};
	componentDidMount() {
		this.getGreeting();
	}
	// this sets the greeting for the user based on the time of day
	getGreeting = () => {
		const date = new Date();
		const hour = date.getHours();
		this.setState({
			hour,
		});
		if (hour >= 0 && hour <= 11) {
			this.setState({
				greeting: `Good morning`,
			});
		} else if (hour >= 12 && hour <= 17) {
			this.setState({
				greeting: `Good afternoon`,
			});
		} else {
			this.setState({
				greeting: `Good evening`,
			});
		}
	};
	// this component doesn't do much to start, just renders some user info to the DOM
	render() {
		return (
			<div>
				<h1 id='welcome'>
					{" "}
					{this.state.greeting}, {this.props.store.user.first_name}
				</h1>
				<p>Your ID is: {this.props.store.user.id}</p>

				
				<LogOutButton className='log-in' />
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
