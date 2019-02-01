import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link, withRouter } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }
  submit = e => {
    e.preventDefault();
    const { email, password } = e.target;
    Accounts.createUser({
      email: email.value,
      password: password.value,
      favorites: [],
    }, err => {
      if (err) {
        this.setState({ err: err.reason });
      }
      else {
        const from = Session.get('from');
        this.props.history.push(from || '/');
      }
    });
  }
  render() {
    const { err } = this.state;
    return (
      <div>
        <h1>Signup</h1>

        {err && <p>{err}</p>}

        <form onSubmit={this.submit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <button>Create Account</button>
        </form>

        <Link to="/login">Login</Link>
      </div>
    )
  }
}

export default withRouter(Signup);
