import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, withRouter } from 'react-router-dom';
import { Session } from 'meteor/session';

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
        const from = Session.get('from');
        Session.set('message', "Logged in!");
        this.props.history.push(from || '/');
      }
    });
  }
  render() {
    const { err } = this.state;
    return (
      <div className="container w-75 mx-auto my-4 shadow-sm border bg-light p-3 rounded">
        <h1 className="border-bottom mb-4">Login to Resource Share</h1>

        {err && <p className="alert alert-warning">{err}</p>}

        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>Email</label>
            <input className="form-control" type="email" name="email" placeholder="Email" autoComplete="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-control" type="password" name="password" placeholder="Password" autoComplete="email" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>

        <Link to="/signup">Register</Link>
      </div>
    )
  }
}

export default withRouter(Login);
