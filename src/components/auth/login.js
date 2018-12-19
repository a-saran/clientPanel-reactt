import React, { Component } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';
import { notifyUser } from '../../actions/notifyAction';
import Alert from "../layout/Alert";

class login extends Component {
	state = {
		email: '',
		password: ''
	}
	onchange = e => this.setState({ [e.target.name]: e.target.value })

	onsubmit = e => {
		e.preventDefault();

		const { firebase, notifyUser } = this.props;
		const { email, password } = this.state;

		firebase.login({
			email,
			password
		}).catch(err => notifyUser('Invalid login Credentials', 'error'))
	}

	render() {
		const { message, messageType } = this.props.notify;
		return (
			<div className="row">
				<div className="col-md-6 mx-auto">
					<div className="card">
						<div className="card-body">
							{message ? (
								<Alert message={message} messageType={messageType} />
							) : null}
							<h1 className="text-center pb-4 pt-3">
								<span className="text-primary">
									<i className="fas fa-lock">
									</i>{' '}
									Login
                                </span>
							</h1>
							<form onSubmit={this.onsubmit}>
								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="text"
										name="email"
										className="form-control"
										required
										value={this.state.email}
										onChange={this.onchange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="password">Password</label>
									<input
										type="password"
										name="password"
										className="form-control"
										required
										value={this.state.password}
										onChange={this.onchange}
									/>
								</div>
								<input type="submit" className="btn btn-block" value="Login" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
login.propTypes = {
	firebase: PropTypes.object.isRequired,
	notify: PropTypes.object.isRequired,
	notifyUser: PropTypes.func.isRequired
}
export default compose(
	firebaseConnect(),
	connect((state, props) => ({
		notify: state.notify
	}), { notifyUser })
)(login);
