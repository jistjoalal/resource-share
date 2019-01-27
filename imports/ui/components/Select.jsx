import React from 'react';

export default class Select extends React.Component {
  render() {
    const { title, options, remove, value, ...rest } = this.props;
    return (
      <div>
        <div>
          <span>{title}</span>
          {value && <button onClick={remove}>X</button>}
        </div>
        <select value={value} {...rest}>
          <option value="">{`-- ${title} --`}</option>
          {this.renderOptions(options)}
        </select>
      </div>
    );
  }
  renderOptions = list => {
    return Object.values(list).map(c =>
      <option key={c.code} value={c.code}>{c.code}</option>
    )
  }
}
