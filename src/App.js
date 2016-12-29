import React, { Component } from 'react';

import TimeInput from './Html5TimeInput';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Hello, once upon a time:
        <TimeInput />
        and b time,
        <TimeInput />
        and your name?
        <input type="text" />
      </div>
    );
  }
}

export default App;
