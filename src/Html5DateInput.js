import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import './Html5DateInput.css';

class DateInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editIndex: -1,
      year: props.year || 1970,
      month: props.month || 0,
      day: props.day || 0,
      monthWaitFor2ndNum: false,
      dayWaitFor2ndNum: false,
      yearWaitFor2ndNum: false
    };

    this.onMonthClick = this.onMonthClick.bind(this);
    this.onDayClick = this.onDayClick.bind(this);
    this.onYearClick = this.onYearClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  componentDidUpdate() {
    if (this.props.onChangeCallback) {
      const date = `${this.getMonth()}/${this.getDay()}/${this.getYear()}`;
      if (!this.date || this.date !== date) {
        this.props.onChangeCallback(date);
        this.date = date;
      }
    }
  }

  onMonthClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 0,
      dayWaitFor2ndNum: false,
      yearWaitFor2ndNum: false
    });
  }

  onDayClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 1,
      monthWaitFor2ndNum: false,
      yearWaitFor2ndNum: false
    });
  }

  onYearClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 2,
      monthWaitFor2ndNum: false,
      dayWaitFor2ndNum: false
    });
  }

  onFocus(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // so that it's after onClick
    setTimeout(() => {
      if (this.state.editIndex === -1) {
        this.setState({
          editIndex: 0
        });
      }
    }, 100);
  }

  onBlur(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    if (this.state.editIndex !== -1) {
      this.setState({
        editIndex: -1
      });
    }
  }

  onKeyDown(evt) {
    let editIndex = this.state.editIndex;

    if (evt.key === 'Tab') {
      editIndex += 1;
      if (editIndex === 3) {
        editIndex = -1;
      } else {
        evt.stopPropagation();
        evt.preventDefault();
      }
      this.setState({
        editIndex,
        monthWaitFor2ndNum: false,
        dayWaitFor2ndNum: false,
        yearWaitFor2ndNum: false
      });
      return;
    }

    evt.stopPropagation();
    evt.preventDefault();

    switch (evt.key) {
    case 'ArrowLeft':
      this.setState({
        editIndex: editIndex === 0 ? editIndex : editIndex - 1,
        monthWaitFor2ndNum: false,
        dayWaitFor2ndNum: false,
        yearWaitFor2ndNum: false
      });
      break;
    case 'ArrowRight':
      this.setState({
        editIndex: editIndex === 2 ? 2 : editIndex + 1,
        monthWaitFor2ndNum: false,
        dayWaitFor2ndNum: false,
        yearWaitFor2ndNum: false
      });
      break;
    case 'Backspace':
      if (this.state.editIndex === 2) {
        this.setState({
          editIndex: 1,
          year: 0
        });
      }
      if (this.state.editIndex === 1) {
        this.setState({
          editIndex: 0,
          month: 0
        });
      }
      if (this.state.editIndex === 0) {
        this.setState({
          day: 0
        });
      }
      break;
    default:
      this.handleKey(evt.key);
    }
  }

  handleKey(key) {
    switch (this.state.editIndex) {
    case 0:
      this.handleKeyMonth(key);
      break;
    case 1:
      this.handleKeyDay(key);
      break;
    case 2:
      this.handleKeyYear(key);
      break;
    default:
      return;
    }
  }

  handleKeyMonth(key) {
    let newMonth = this.state.month;
    let moveToNext = false;
    let wait = false;

    switch (key) {
    case 'ArrowUp':
      newMonth += 1;
      break;
    case 'ArrowDown':
      newMonth -= 1;
      break;
    case '0':
    case '1':
      if (!this.state.monthWaitFor2ndNum) {
        newMonth = Math.max(0, parseInt(key, 10) - 1);
        wait = true;
      } else {
        newMonth = parseInt(key, 10) + 9;
        wait = false;
        moveToNext = true;
      }
      break;
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (!this.state.monthWaitFor2ndNum) {
        newMonth = parseInt(key, 10) - 1;
      } else {
        newMonth = parseInt(key, 10) + 9;
        if (newMonth >= 12) {
          newMonth -= 10;
        }
      }
      moveToNext = true;
      break;
    default:
      return;
    }

    newMonth += 12;
    newMonth %= 12;

    let newEditIndex = this.state.editIndex;
    if (moveToNext) {
      newEditIndex += 1;

      if (newEditIndex > 2) {
        newEditIndex = -1;
      }
    }

    this.setState({
      month: newMonth,
      editIndex: newEditIndex,
      monthWaitFor2ndNum: wait
    });
  }

  handleKeyDay(key) {
    // let newSec = this.state.sec;
    // let moveToNext = false;
    // let wait = false;

    // switch (key) {
    // case 'ArrowUp':
    //   newSec += MINUTE;
    //   break;
    // case 'ArrowDown':
    //   newSec -= MINUTE;
    //   break;
    // case '0':
    // case '1':
    // case '2':
    // case '3':
    // case '4':
    // case '5':
    //   if (!this.state.dayWaitFor2ndNum) {
    //     newSec -= this.state.sec % HOUR - this.state.sec % MINUTE;
    //     newSec += parseInt(key, 10) * MINUTE;
    //     wait = true;
    //   } else {
    //     newSec += (this.state.sec % HOUR - this.state.sec % MINUTE) * 9;
    //     newSec += parseInt(key, 10) * MINUTE;
    //     wait = false;
    //     moveToNext = true;
    //   }
    //   break;
    // case '6':
    // case '7':
    // case '8':
    // case '9':
    //   if (!this.state.yearWaitFor2ndNum) {
    //     newSec -= this.state.sec % HOUR - this.state.sec % MINUTE;
    //     newSec += parseInt(key, 10) * MINUTE;
    //   } else {
    //     newSec += (this.state.sec % HOUR - this.state.sec % MINUTE) * 9;
    //     newSec += parseInt(key, 10) * MINUTE;
    //   }
    //   moveToNext = true;
    //   break;
    // default:
    //   return;
    // }

    // newSec += ALL_DAY;
    // newSec %= ALL_DAY;

    // let newEditIndex = this.state.editIndex;
    // if (moveToNext) {
    //   newEditIndex += 1;

    //   if (newEditIndex > 3) {
    //     newEditIndex = -1;
    //   }
    // }

    // this.setState({
    //   sec: newSec,
    //   editIndex: newEditIndex,
    //   minuteWaitFor2ndNum: wait
    // });
  }

  handleKeyYear(key) {
    // let newSec = this.state.sec;
    // let moveToNext = false;
    // let wait = false;

    // switch (key) {
    // case 'ArrowUp':
    //   newSec += 1;
    //   break;
    // case 'ArrowDown':
    //   newSec -= 1;
    //   break;
    // case '0':
    // case '1':
    // case '2':
    // case '3':
    // case '4':
    // case '5':
    //   if (!this.state.yearWaitFor2ndNum) {
    //     newSec -= this.state.sec % 60;
    //     newSec += parseInt(key, 10);
    //     wait = true;
    //   } else {
    //     let seconds = (this.state.sec % 60) * 10 + parseInt(key, 10);
    //     newSec -= this.state.sec % 60;
    //     newSec += seconds;
    //     wait = false;
    //     moveToNext = true;
    //   }
    //   break;
    // case '6':
    // case '7':
    // case '8':
    // case '9':
    //   if (!this.state.yearWaitFor2ndNum) {
    //     newSec -= this.state.sec % 60;
    //     newSec += parseInt(key, 10);
    //   } else {
    //     let seconds = (this.state.sec % 60) * 10 + parseInt(key, 10);
    //     newSec -= this.state.sec % 60;
    //     newSec += seconds;
    //   }
    //   moveToNext = true;
    //   break;
    // default:
    //   return;
    // }

    // newSec += ALL_DAY;
    // newSec %= ALL_DAY;

    // let newEditIndex = this.state.editIndex;
    // if (moveToNext) {
    //   newEditIndex += 1;

    //   if (newEditIndex > 3) {
    //     newEditIndex = -1;
    //   }
    // }

    // this.setState({
    //   sec: newSec,
    //   editIndex: newEditIndex,
    //   secondWaitFor2ndNum: wait
    // });
  }

  getMonth() {
    let month = (this.state.month + 1).toString();
    while (month.length < 2) {
      month = '0' + month;
    }

    return month;
  }

  getDay() {
    let day = (this.state.day + 1).toString();
    while (day.length < 2) {
      day = '0' + day;
    }

    return day;
  }

  getYear() {
    let year = this.state.year.toString();
    while (year.length < 4) {
      year = '0' + year;
    }

    return year;
  }

  render() {
    const monthCls = classNames('DateInput-hour', {
      'DateInput--selected': this.state.editIndex === 0
    });

    const dayCls = classNames('DateInput-minute', {
      'DateInput--selected': this.state.editIndex === 1
    });

    const yearCls = classNames('DateInput-second', {
      'DateInput--selected': this.state.editIndex === 2
    });

    const ampmCls = classNames('DateInput-ampm', {
      'DateInput--selected': this.state.editIndex === 3
    });

    return (
      <span className="DateInput" contentEditable={true} suppressContentEditableWarning onKeyDown={this.onKeyDown} onFocus={this.onFocus} onBlur={this.onBlur}>
        <span contentEditable={false}>
          <span className={monthCls} onClickCapture={this.onMonthClick}>{this.getMonth()}</span>
          <span className="DateInput-sep">/</span>
          <span className={dayCls} onClickCapture={this.onDayClick}>{this.getDay()}</span>
          <span className="DateInput-sep">/</span>
          <span className={yearCls} onClickCapture={this.onYearClick}>{this.getYear()}</span>
        </span>
      </span>
    );
  }
}

DateInput.propTyps = {
  sec: PropTypes.number,
  onChangeCallback: PropTypes.func
};

export default DateInput;
