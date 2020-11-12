import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";

class UserPage extends Component {
	state = {
		hour: null,
		greeting: "",
		defaultImg: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
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


	editUserNav=()=>{
	  this.props.history.push('/edituser')
	}

	
	// this component doesn't do much to start, just renders some user info to the DOM
	render() {
		return (
			<div>
				<div id="outline">
					<h1 id='welcome'>
						{" "}
						{this.state.greeting}, {this.props.store.user.first_name}
					</h1>
					<hr/>
					{/* <p>Your ID is: {this.props.store.user.id}</p> */}
					<img src={this.state.defaultImg} width='100px'></img><br/>
					<button onClick={this.editUserNav}>Edit User</button><br/>
					<LogOutButton className='log-in' />
					
				</div>

				<div id="outline">
					<h4>This is where we could put events</h4>
				</div>

				<div id="outline">
					<h4>This is where we could put past events</h4>
				</div>

				<div id="outline">
					<h4>This is where we could put active/current events</h4>
				</div>

			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
