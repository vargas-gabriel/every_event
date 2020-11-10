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
	};

	registerUser = (event) => {
		event.preventDefault();

		this.props.dispatch({
			type: "REGISTER",
			payload: {
				username: this.state.username,
				password: this.state.password,
			},
		});
	}; // end registerUser

	handleInputChangeFor = (propertyName) => (event) => {
		this.setState({
			[propertyName]: event.target.value,
		});
	};

	render() {
		return (
			<form className='formPanel' onSubmit={this.registerUser}>
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
							// value={this.state.username}
							required
							// onChange={this.handleInputChangeFor('username')}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='Lastname'>
						Last name:
						<input
							type='text'
							name='Lastname'
							// value={this.state.username}
							required
							// onChange={this.handleInputChangeFor('username')}
						/>
					</label>
				</div>
				<div>
					<label htmlFor='email'>
						Email:
						<input
							type='text'
							name='email'
							// value={this.state.username}
							required
							// onChange={this.handleInputChangeFor('username')}
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
							// value={this.state.password}
							required
							// onChange={this.handleInputChangeFor('password')}
						/>
					</label>
				</div>
				<div>
					User social Oauth
					{/* <label htmlFor="Verifypassword">
            Verify password:
            <input
              type="password"
              name="verifypassword"
              // value={this.state.password}
              required
              // onChange={this.handleInputChangeFor('password')}
            />
          </label> */}
				</div>
				<div>
					<input className='btn' type='submit' name='submit' value='Register' />
				</div>
			</form>
		);
	}
}

export default connect(mapStoreToProps)(RegisterForm);
