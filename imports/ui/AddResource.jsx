import React from 'react';
import { Meteor } from 'meteor/meteor';

class AddResource extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.newResource}>

          <h3>Submit New Resource</h3>

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

    /* ghetto validation */ 

    // required
    // if (url === '') return alert('no url');
    if (title === '') return alert('no title');
    if (!grade) return alert('no grade specified');
    if (!domain) return alert('no domain specified');
    // if (!cluster) return alert('no cluster specified');
    // if (!standard) return alert('no standard');

    // optional
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
    ); 

    // reset form
    url.value = '';
    title.value = '';
  }
}

export default AddResource;
