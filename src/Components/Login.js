import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import genericApiCall from './GenericApi';

export default function Login() {
    const navigate = useNavigate(); // Initialize the useNavigate hook
    const [isTokenGenerated, setIsTokenGenerated] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        genericApiCall({
            endpoint: 'generate-token/',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                username: username,
                password: password,
            },
            callback: (data) => {
                if (data.token) {
                    localStorage.setItem('accessToken', data.token);
                    navigate('/');
                    window.location.reload();
                    setIsTokenGenerated(true);
                } else {
                    setIsTokenGenerated(false);
                    console.error('Wrong username or password. Unable to generate token.');
                }
            },
        });

    };

    return (
        <>
            {!isTokenGenerated ?
                (<>
                    <div class="alert alert-danger" role="alert">
                        Wrong username or password.
                    </div>
                </>) : ""
            }
            <div className='container form-div m-4 '>
                <form className='login-form p-4' onSubmit={handleSubmit}>
                    <h1>Please Log in</h1>
                    <div className="mb-3">
                        <label htmlFor="usernameInput" className="form-label">Username</label>
                        <input type="username" className="form-control" id="usernameInput" aria-describedby="usernameHelp" />
                        <div id="usernameHelp" className="form-text">We'll never share your username with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" className="form-label">Password</label>
                        <input type="password" className="form-control" id="passwordInput" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
}
