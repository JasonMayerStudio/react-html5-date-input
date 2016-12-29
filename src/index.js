import React from 'react';
import ReactDOM from 'react-dom';
import TimeInput from './Html5TimeInput';

import './index.css';

ReactDOM.render(
  <div className="App">
    once update a time &nbsp;
    <TimeInput sec={15*3600+35*60+8} onChangeCallback={(time) => { console.log(time); }}/>
    &nbsp; wants to compare with b time &nbsp;
    <input type="time" />
  </div>,
  document.getElementById('root')
);
