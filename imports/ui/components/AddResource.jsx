import React from 'react';
import { Meteor } from 'meteor/meteor';

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
    const { grade, domain, cluster, standard, component } = this.props;
    const { url, title} = e.target;

    // optionals get set to empty string
    const optCluster = (cluster && cluster.code) || '';
    const optStandard = (standard && standard.code) || '';
    const optComponent = (component && component.code) || '';

    // db
    Meteor.call('resources.new',
      title.value,
      url.value,
      grade.code,
      domain.code,
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

export default AddResource;
