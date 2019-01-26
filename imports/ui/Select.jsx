import React from 'react';

export default class Select extends React.Component {
  render() {
    const { title, options, ...rest } = this.props;
    return (
      <label>
        <p>{title}</p>
        <select {...rest}>
          <option value="">{`-- ${title} --`}</option>
          {this.renderOptions(options)}
        </select>
      </label>
    );
  }
  renderOptions = list => {
    return Object.values(list).map(c =>
      <option key={c.code} value={c.code}>{c.code}</option>
    )
  }
}
