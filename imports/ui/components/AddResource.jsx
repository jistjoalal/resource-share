import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      err: '',
    };
  }
  render() {
    const { err } = this.state;
    return (
      <div>
        <form onSubmit={this.newResource}>

          <h3>Submit New Resource</h3>

          {err && <p>{err}</p>}

          <input type="text" name="title" placeholder="Title" /> 
          <input type="text" name="url" placeholder="URL" /> 

          <button type="submit">Submit</button>

        </form>

      </div>
    )
  }
  newResource = e => {
    e.preventDefault();
    const { pathname } = this.props.history.location;
    const [ grade, domain, cluster, standard, component ] = 
      pathname.slice(1).split('.');
    const { url, title} = e.target;

    // optionals get set to empty string
    const optCluster = cluster || '';
    const optStandard = standard || '';
    const optComponent = component || '';

    // db
    Meteor.call('resources.new',
      title.value,
      url.value,
      grade,
      domain,
      optCluster,
      optStandard,
      optComponent,
      (err, res) => {
        if (err) {
          this.setState({ err: err.reason });
        }
        else {
          // reset form
          url.value = '';
          title.value = '';
        }
      }
    ); 
  }
}

export default withRouter(AddResource);
