import React, { Component } from 'react';
import classNames from 'classnames';

import './Html5TimeInput.css';

class TimeInpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editIndex: -1
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
    }
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

    return (
      <span className="TimeInpt" contentEditable={true} suppressContentEditableWarning onKeyDown={this.onKeyDown} onChange={() => {}}>
        <span contentEditable={false}>
          <span className={hourCls} onClick={this.onHourClick}>12</span>
          <span className="TimeInpt-colon">:</span>
          <span className={minuteCls} onClick={this.onMinuteClick}>00</span>
          <span className="TimeInpt-colon">:</span>
          <span className={secondCls} onClick={this.onSecondClick}>00</span>
          <span className={ampmCls} onClick={this.onAmpmClick}>AM</span>
        </span>
      </span>
    );
  }
}

export default TimeInpt;
