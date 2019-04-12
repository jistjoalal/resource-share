import React from 'react';

export default class Select extends React.Component {
  render() {
    const { title, options, value, ...rest } = this.props;
    return (
      <div className="Select d-flex flex-column justify-content-between border m-2 p-1">

        <span>{title}</span>

        <div className="d-flex justify-content-between align-items-center">

          <select
            className="text-primary"
            value={value}
            {...rest}
          >
            {/* placeholder */}
            <option value="">{`${title}s`}</option>

            {/* options */}
            {this.renderOptions(options)}
            
          </select>
          
        </div>

      </div>
    );
  }
  renderOptions = list => {
    return Object.values(list).map(c =>
      <option
        key={c.code} 
        value={c.code}
      >
        {c.code}
      </option>
    )
  }
}
