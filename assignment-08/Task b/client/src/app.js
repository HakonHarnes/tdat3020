// @flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

import { authenticator } from './services';

import './main.css';

const crypto = require('crypto');

/*
   This class is a simple user interface for registering and 
   logging in users, as well as validating access tokens 
 */
class App extends Component {
    username: string = '';
    loggedInUsername: string = '';
    password: string = '';
    clientHash: string = '';
    token: string = '';

    // Registers a new user
    register = () => {
        this.PBKDF2('/register');
    };

    // Logs a user in
    login = () => {
        this.PBKDF2('/login');
    };

    // Encrypts password with PBKDF2 and sends client hash to server
    PBKDF2 = (path) => {
        crypto.pbkdf2(this.password, window.location.hostname + window.location.pathname + this.username, 1024, 512 / 32, 'SHA512', (error, hash) => {
            if (error) throw error;
            this.clientHash = hash.toString('hex');
            this.sendData(path);
        });
    };

    // Sends username and client hash to server (either /login or /register)
    sendData(path) {
        authenticator
            .sendData(this.username, this.clientHash, path)
            .then((res) => {
                // Status code response handling
                let status = res.status;
                switch (status) {
                    case 200:
                        alert('Logged in!');
                        this.loggedInUsername = this.username;
                        this.token = res.headers['authorization'];
                        break;
                    case 201:
                        alert('Registered account!');
                        break;
                    default:
                        alert('OK');
                        break;
                }

                // Clears input fields
                this.username = '';
                this.password = '';
            })
            .catch((error) => {
                // Status code response handling
                let status = parseInt((error + '').split(' ')[6], 10);
                switch (status) {
                    case 401:
                        alert('Unauthorized');
                        break;
                    case 409:
                        alert('Username taken');
                        break;
                    case 500:
                        alert('Internal server error');
                        break;
                    default:
                        alert('Error');
                        break;
                }

                // Clears input fields
                this.username = '';
                this.password = '';
            });
    }

    // Handles input field change for username
    handleUsernameChange = (event) => {
        this.username = event.target.value;
    };

    // Handles input field change for password
    handlePasswordChange = (event) => {
        this.password = event.target.value;
    };

    // Handles 'Check token' button click
    handleTokenClick = () => {
        this.checkToken();
    };

    // Sends token to server, and checks if it is valid
    checkToken() {
        authenticator
            .checkToken(this.loggedInUsername, this.token)
            .then((res) => {
                alert('Valid token!\n' + this.token);
            })
            .catch((error) => {
                alert('Invalid token!\n' + this.token);
                this.loggedInUsername = '';
            });
    }

    // Renders application
    render() {
        return (
            <div className='container'>
                <p className='info'>{this.loggedInUsername !== '' ? 'Logged in as ' + this.loggedInUsername : 'Logged out'}</p>
                <input className='username' type='text' placeholder='username' value={this.username} onChange={this.handleUsernameChange}></input>
                <input className='password' type='password' placeholder='password' value={this.password} onChange={this.handlePasswordChange}></input>
                <button className='login' onClick={this.login}>
                    Log in
                </button>
                <button className='register' onClick={this.register}>
                    Register
                </button>
                <button className='token' onClick={this.handleTokenClick}>
                    Check token
                </button>
            </div>
        );
    }
}

const root = document.querySelector('.root');
if (root) ReactDOM.render(<App />, root);

export default App;
