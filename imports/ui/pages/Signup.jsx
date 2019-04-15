import React from 'react';
import { Helmet } from 'react-helmet';
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
    const { email, password, cPassword } = e.target;
    // password match
    if (password.value !== cPassword.value) {
      return this.setState({ err: 'Passwords must match' });
    }
    // send to server
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
        Session.set('message', 'Thanks for signing up!');
        this.props.history.push(from || '/');
      }
    });
  }
  render() {
    const { err } = this.state;
    return (
      <div className="container w-75 mx-auto my-4 shadow-sm border bg-light p-3 rounded">

        <Helmet>
          <title>Signup for Resource Share</title>
        </Helmet>

        <h1 className="border-bottom mb-4">
          Signup
        </h1>

        {err &&
          <p className="alert alert-warning">
            {err}
          </p>
        }

        <form onSubmit={this.submit}>
        
          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="foo"
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              className="form-control"
              type="password"
              name="cPassword"
              placeholder="Password"
              autoComplete="foo"
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary">
              Register
            </button>
          </div>

        </form>

        <Link to="/login">
          Login
        </Link>

      </div>
    )
  }
}

export default withRouter(Signup);
