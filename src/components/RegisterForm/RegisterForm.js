import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";

class RegisterForm extends Component {
	state = {
		firstname: "",
		lastname: "",
		email: "",
		password: "",
		verifypassword: "",
		ayrshareapikey: "",
		image: "",
	};
	// 		-----  required in inputs has a pop up on form submission. checkField for empty not needed  -----
	checkUrl = (event) => {
		if(this.state.image.length > 1000){
			alert('Image URL is too long');
		}else{
			this.registerUser();
		}
	}

	verifyPassword = (event) => {
		event.preventDefault();
		if (this.state.password === this.state.verifypassword) {
			this.checkUrl();
		} else {
			alert("password does not match");
		}
	};

	registerUser = () => {
		this.props.dispatch({
			type: "REGISTER",
			payload: {
				firstname: this.state.firstname,
				lastname: this.state.lastname,
				email: this.state.email,
				password: this.state.password,
				ayrshareapikey: this.state.ayrshareapikey,
				image: this.state.image,
			},
		});
	}; // end registerUser

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	render() {
		//console.log("this is our state:", this.state);
		console.log('url length', this.state.image.length);
		return (
			<>
				<br/>
				<form className='formPanel' onSubmit={this.verifyPassword}>
					<h2>Register User</h2>
					{this.props.store.errors.registrationMessage && (
						<h3 className='alert' role='alert'>
							{this.props.store.errors.registrationMessage}
						</h3>
					)}
					<div>
						<label htmlFor='firstname'>
							First name:
							<input
								type='text'
								name='firstname'
								value={this.state.firstname}
								required
								onChange={this.handleInputChangeFor("firstname")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='Lastname'>
							Last name:
							<input
								type='text'
								name='Lastname'
								value={this.state.lastname}
								required
								onChange={this.handleInputChangeFor("lastname")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='email'>
							Email:
							<input
								type='text'
								name='email'
								value={this.state.email}
								required
								onChange={this.handleInputChangeFor("email")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='ayrshare api key'>
							ayrshare api key: <a href='https://www.ayrshare.com/' target='blank'>
								Get your key here
							</a>
							<input
								type='text'
								name='ayrshareapikey'
								value={this.state.ayrshareapikey}
								required
								onChange={this.handleInputChangeFor("ayrshareapikey")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='image'>
							User Image URL
							<input
								type='text'
								name='image'
								value={this.state.image}
								required
								onChange={this.handleInputChangeFor("image")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='password'>
							Password:
							<input
								type='password'
								name='password'
								value={this.state.password}
								required
								onChange={this.handleInputChangeFor("password")}
							/>
						</label>
					</div>
					<div>
						<label htmlFor='Verifypassword'>
							Verify password:
							<input
								type='password'
								name='verifypassword'
								value={this.state.verifypassword}
								required
								onChange={this.handleInputChangeFor("verifypassword")}
							/>
						</label>
					</div>

					<div>
						<input className='btn' type='submit' name='submit' value='Register' />
					</div>
				</form>
			</>
		);
	}
}

export default connect(mapStoreToProps)(RegisterForm);
