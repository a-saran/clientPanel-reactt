import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

class AddClient extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        balance: ''
    }
    onchange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault();

        const newClient = this.state;

        const { firestore } = this.props;

        if (newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({ collection: 'clients' }, newClient).then(() => this.props.history.push('/'));
    }

    render() {

        const { disableBalanceOnAdd } = this.props.settings;
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/" className="btnbtn-link">
                            <i className="fas fa-arrow-circle-left">{' '}</i>Back to DashBoard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="firstName">firstName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    minLength='2'
                                    required
                                    onChange={this.onchange}
                                    value={this.state.firstName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lasttName">lastName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    minLength='1'
                                    required
                                    onChange={this.onchange}
                                    value={this.state.lastName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    required
                                    onChange={this.onchange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    minLength='10'
                                    required
                                    onChange={this.onchange}
                                    value={this.state.phone}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="balance">balance</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="balance"
                                    onChange={this.onchange}
                                    value={this.state.balance}
                                    disabled={disableBalanceOnAdd}
                                />
                            </div>
                            <input type="submit" className="btn btn-primary btn-block" value="submit" name="" id="" />
                        </form>

                    </div>
                </div>

            </div>
        )
    }
}

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired,
    settings: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(),
    connect((state, props) => ({
        settings: state.settings
    }))
)(AddClient);
