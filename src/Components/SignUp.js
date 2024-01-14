import React, { Component } from 'react';
import genericApiCall from './GenericApi';


export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            succesfull: false,
            errors: {}
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };


    handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!this.state.username.trim()) {
            errors.username = 'Username is required';
        }
        if (!this.state.password.trim()) {
            errors.password = 'Password is required';
        }
        if (this.state.password !== this.state.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return;
        }
        const requestBody = {
            username: this.state.username,
            password: this.state.password
        };

        // Make API call to add user
        genericApiCall({
            endpoint: 'create-user/',
            method: 'POST',
            body: requestBody,
            callback: (data) => {
                if(data.username === this.state.username){
                    this.setState({succesfull : true})
                }
            },
        });
    };

    render() {
        const { errors, succesfull } = this.state;

        return (
            <>
                {succesfull ? (<>
                    <div class="alert alert-primary" role="alert">
                        Account created succesfully!! 
                    </div>
                </>) : ""}
                <div className='container form-div m-4 '>
                    <form className='login-form p-4' onSubmit={this.handleSubmit}>
                        <h1>Please SignUp</h1>
                        <div className="my-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                id="username"
                                aria-describedby="usernameHelp"
                                onChange={this.handleChange}
                            />
                            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                id="password"
                                onChange={this.handleChange}
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                id="confirmPassword"
                                onChange={this.handleChange}
                            />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </>
        );
    }
}
