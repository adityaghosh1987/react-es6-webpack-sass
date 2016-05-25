'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import header from './component';
import Hello from './components/hello/hello_component';

document.body.appendChild(header());

ReactDOM.render(<Hello/>, document.getElementById('hello'));
