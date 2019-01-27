import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }
  submit = e => {
    e.preventDefault();
    const { email, password } = e.target;
    Meteor.loginWithPassword({ email: email.value }, password.value, err => {
      if (err) {
        this.setState({ err: err.reason });
      }
      else {
        this.props.history.push('/');
      }
    });
  }
  render() {
    const { err } = this.state;
    return (
      <div>
        <h1>Login</h1>

        {err && <p>{err}</p>}

        <form onSubmit={this.submit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Register</Link>
      </div>
    )
  }
}

export default withRouter(Login);