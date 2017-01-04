import React from 'react';
import ReactDOM from 'react-dom';
import DateInput from './Html5DateInput';

import './index.css';

ReactDOM.render(
  <div className="App">
    <DateInput onChangeCallback={(date) => { console.log(date); }}/>
  </div>,
  document.getElementById('root')
);
