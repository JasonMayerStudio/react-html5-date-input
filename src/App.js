import React, { Component } from 'react';

import TimeInput from './Html5TimeInput';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        once update a time &nbsp;
        <TimeInput onChangeCallback={(time) => { console.log(time); }}/>
        &nbsp; wants to compare with b time &nbsp;
        <input type="time" />
      </div>
    );
  }
}

export default App;
