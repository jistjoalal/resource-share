import React from 'react';

export default class Select extends React.Component {
  render() {
    const { title, options, value, ...rest } = this.props;
    return (
      <div className="d-flex flex-column justify-content-between border m-2 p-1">
        <div className="d-flex justify-content-between align-items-center m-1">
          <select className="" value={value} {...rest}>
            <option value="">{`${title}`}</option>
            {this.renderOptions(options)}
          </select>
        </div>
      </div>
    );
  }
  renderOptions = list => {
    return Object.values(list).map(c =>
      <option key={c.code} value={c.code}>{c.code}</option>
    )
  }
}
