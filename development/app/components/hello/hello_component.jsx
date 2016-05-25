'use strict';

require('./hello_style.scss');
import React from 'react';

export default class Hello extends React.Component {
  render() {
    return (
      <div id="HelloComponent">
          <h1 className="header">Hello React</h1>
          <p className="content">This is React Component</p>
      </div>
    )
  }
}
