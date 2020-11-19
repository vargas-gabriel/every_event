import React, { Component } from "react";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import mapStoreToProps from "../../redux/mapStoreToProps";
import EventList from "../EventList/EventList";

class UserPage extends Component {
	state = {
		hour: null,
		greeting: "",
		defaultImg:
			"https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png",
		userEvents: [],
	};
	componentDidMount() {
		this.getGreeting();
		this.props.dispatch({ type: "GET_USER_EVENT" });
		if (window.location.href.includes("=")) {
			console.log("token detected");
			this.checkUrl();
		} else {
			console.log("no token detected");
		}
	}

	checkUrl = () => {
		//console.log('url:', window.location.href.split('=')[1].split('#')[0]);
		const linkedinToken = window.location.href.split("=")[1].split("#")[0];
		console.log("linkedinToken", linkedinToken);

		this.props.dispatch({
			type: "UPDATE_USER",
			payload: {
				id: this.props.store.user.id,
				firstName: this.props.store.user.first_name,
				lastName: this.props.store.user.last_name,
				email: this.props.store.user.email,
				image: this.props.store.user.image,
				linkedin_account: this.props.store.user.linkedin_account,
				linkedin_oauth: linkedinToken,
			},
		});
	};
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

	editUserNav = () => {
		this.props.history.push("/edituser");
	};

	// this component doesn't do much to start, just renders some user info to the DOM
	render() {
		return (
			<div>
				<div id='userDiv'>
					<h2 id='welcome' className='centered'>
						{" "}
						{this.state.greeting}, {this.props.store.user.first_name}
					</h2>
					<hr />
					{/* <p>Your ID is: {this.props.store.user.id}</p> */}
					<img
						id='userImage'
						src={this.props.store.user.image}
						width='100px'></img>

					<div id='userBtns'>
						<button className='centeredImage' onClick={this.editUserNav}>
							Edit User
						</button>
						<br />
						<LogOutButton className='log-in, centeredImage' />
					</div>
					<br />
				</div>

				<div className='rounded'>
					<h1 className='centered'>
						{this.props.store.user.first_name}'s Event's
					</h1>
					<hr />
					<EventList />
				</div>

				{/* <div id='outline'>
					<h4>This is where we could put past events</h4>
				</div>

				<div id='outline'>
					<h4>This is where we could put active/current events</h4>
				</div> */}
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
