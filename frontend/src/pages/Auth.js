import React, { Component } from 'react';

import './Auth.css';

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.emailElement = React.createRef();
    this.passwordElement = React.createRef();
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailElement.current.value;
    const password = this.passwordElement.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    
    const requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
      `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Login Failed');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
    })
    .catch(err => {
      console.log(err);
    })
  };


  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={this.emailElement} />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={this.passwordElement} />
        </div>
        <div className="form-actions">
          <button type="submit">Sign Up</button>
          <button type="button">Go To Sign In</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;