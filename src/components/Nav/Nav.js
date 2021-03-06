import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import mapStoreToProps from "../../redux/mapStoreToProps";

const Nav = (props) => {
	let loginLinkData = {
		path: "/login",
		text: "Login / Register",
	};

	if (props.store.user.id != null) {
		loginLinkData.path = "/user";
		loginLinkData.text = "Home";
	}

	return (
		<div>
			{/* Show the link to the nav bar if the user is logged in */}
			{props.store.user.id && (
				<div className='nav'>
					{/* <Link to='/home'>
						<h2 className='nav-title'>Every Event</h2>
					</Link> */}
					<h2 className='nav-title'>Every Event</h2>
					<div className='nav-right'>
						<Link className='nav-link' to={loginLinkData.path}>
							{/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
							{loginLinkData.text}
						</Link>
						{/* Show the link to the info page and the logout button if the user is logged in */}
						{props.store.user.id && (
							<>
								{/* <Link className='nav-link' to='/info'>
									Info Page
								</Link> */}
								<LogOutButton className='nav-link' />
							</>
						)}
						{/* Always show this link since the about page is not protected */}
						<Link className='nav-link' to='/about'>
							About
						</Link>

						<Link className='nav-link' to='/createevent'>
							Create Event
						</Link>

						<Link className='nav-link' to='/edituser'>
							Edit User
						</Link>

						{/* <Link className='nav-link' to='/editevent'>
						Edit Event
					</Link>
					<Link className='nav-link' to='/editphase'>
						Edit Phase
					</Link> */}
					</div>
				</div>
			)}
		</div>
	);
};

export default connect(mapStoreToProps)(Nav);
