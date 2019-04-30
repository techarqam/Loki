
import React, { Component } from 'react';
import { Icon } from 'antd';
import '../css/Setting.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfileCard from '../container/profileCard';
import ResetPassword from '../container/resetPassword';

class UserSettings extends Component {
	render() {
		let subheading = "settings";
		return (
			<div>
				<h3>User</h3>
				<h4> {subheading} </h4>
				<Router >
					<div className="row">
						<div className="col-md-3" >
							<div className="setting-img">
								<Icon type="user" />
							</div>
							<div className="setting-nav">
								<p>ACTIONS</p>
								<div  >
									<ul>
										<li>
											<Link to="/profile/view">View profile</Link>
										</li>
										<li>
											<Link to="/profile/resetPass">Reset password</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<Route path="/profile/view" component={ProfileCard} />
							<Route path="/profile/resetPass" component={ResetPassword} />
						</div>
					</div>
				</Router>
			</div>
		);
	}
}

export default UserSettings;

