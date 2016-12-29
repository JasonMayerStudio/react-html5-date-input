import React, { Component } from 'react';
import classNames from 'classnames';

import './Html5TimeInput.css';

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const ALL_DAY = 24 * HOUR;
const HALF_DAY = ALL_DAY / 2;

class TimeInpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editIndex: -1,
      sec: 0
    };

    this.onHourClick = this.onHourClick.bind(this);
    this.onMinuteClick = this.onMinuteClick.bind(this);
    this.onSecondClick = this.onSecondClick.bind(this);
    this.onAmpmClick = this.onAmpmClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onHourClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 0
    });
  }

  onMinuteClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 1
    });
  }

  onSecondClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 2
    });
  }

  onAmpmClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 3
    });
  }

  onKeyDown(evt) {
    console.log(evt.key);

    switch(evt.key) {
    case 'ArrowLeft':
      this.setState({
        editIndex: (this.state.editIndex + 3) % 4
      });
      break;
    case 'ArrowRight':
      this.setState({
        editIndex: (this.state.editIndex + 1) % 4
      });
      break;
    default:
      this.handleKey(evt.key);
    }
  }

  handleKey(key) {
    switch(this.state.editIndex) {
    case 0:
      this.handleKeyHour(key);
      break;
    case 1:
      this.handleKeyMinute(key);
      break;
    case 2:
      this.handleKeySecond(key);
      break;
    case 3:
      this.handleKeyAmpm(key);
      break;
    }
  }

  handleKeyHour(key) {
    let newSec = this.state.sec;
    switch(key) {
    case 'ArrowUp':
      newSec += HOUR;
      break;
    case 'ArrowDown':
      newSec -= HOUR;
      break;
    }

    newSec += ALL_DAY;
    newSec %= ALL_DAY;

    this.setState({
      sec: newSec
    });
  }

  handleKeyMinute(key) {
    let newSec = this.state.sec;
    switch(key) {
    case 'ArrowUp':
      newSec += MINUTE;
      break;
    case 'ArrowDown':
      newSec -= MINUTE;
      break;
    }

    newSec += ALL_DAY;
    newSec %= ALL_DAY;

    this.setState({
      sec: newSec
    });
  }

  handleKeySecond(key) {
    let newSec = this.state.sec;
    switch(key) {
    case 'ArrowUp':
      newSec += 1;
      break;
    case 'ArrowDown':
      newSec -= 1;
      break;
    }

    newSec += ALL_DAY;
    newSec %= ALL_DAY;

    this.setState({
      sec: newSec
    });
  }

  handleKeyAmpm(key) {
    let newSec = this.state.sec;
    if (key === 'ArrowUp' || key === 'ArrowDown') {
      newSec = (this.state.sec + HALF_DAY) % ALL_DAY;
    } else if (key === 'a' || key === 'A') {
      newSec %= HALF_DAY;
    } else if (key === 'p' || key === 'P') {
      newSec %= HALF_DAY;
      newSec += HALF_DAY;
    }

    this.setState({
      sec: newSec
    });
  }

  render() {
    const hourCls = classNames('TimeInpt-hour', {
      'TimeInpt--selected': this.state.editIndex === 0
    });

    const minuteCls = classNames('TimeInpt-minute', {
      'TimeInpt--selected': this.state.editIndex === 1
    });

    const secondCls = classNames('TimeInpt-second', {
      'TimeInpt--selected': this.state.editIndex === 2
    });

    const ampmCls = classNames('TimeInpt-ampm', {
      'TimeInpt--selected': this.state.editIndex === 3
    });

    let hour = Math.floor(this.state.sec / HOUR);
    if (hour > 12) {
      hour -= 12;
    }
    hour = hour.toString();
    if (hour.length < 2) {
      hour = '0' + hour;
    }

    let minute = (Math.floor((this.state.sec % HOUR) / MINUTE)).toString();
    if (minute.length === 1) {
      minute = '0' + minute;
    }

    let second = (this.state.sec % 60).toString();
    if (second.length === 1) {
      second = '0' + second;
    }

    let ampm = this.state.sec < HALF_DAY ? 'AM' : 'PM';

    return (
      <span className="TimeInpt" contentEditable={true} suppressContentEditableWarning onKeyDown={this.onKeyDown} onChange={() => {}}>
        <span contentEditable={false}>
          <span className={hourCls} onClick={this.onHourClick}>{hour}</span>
          <span className="TimeInpt-colon">:</span>
          <span className={minuteCls} onClick={this.onMinuteClick}>{minute}</span>
          <span className="TimeInpt-colon">:</span>
          <span className={secondCls} onClick={this.onSecondClick}>{second}</span>
          <span className={ampmCls} onClick={this.onAmpmClick}>{ampm}</span>
        </span>
      </span>
    );
  }
}

export default TimeInpt;
