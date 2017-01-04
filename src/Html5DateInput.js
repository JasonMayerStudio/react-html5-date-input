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
      yearInputCnt: 0
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
      yearInputCnt: 0
    });
  }

  onDayClick(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({
      editIndex: 1,
      monthWaitFor2ndNum: false,
      yearInputCnt: 0
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
        yearInputCnt: 0
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
        yearInputCnt: 0
      });
      break;
    case 'ArrowRight':
      this.setState({
        editIndex: editIndex === 2 ? 2 : editIndex + 1,
        monthWaitFor2ndNum: false,
        dayWaitFor2ndNum: false,
        yearInputCnt: 0
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
    let newDay = this.state.day;
    let moveToNext = false;
    let wait = false;

    switch (key) {
    case 'ArrowUp':
      newDay += 1;
      break;
    case 'ArrowDown':
      newDay -= 1;
      break;
    case '0':
    case '1':
    case '2':
    case '3':
      if (!this.state.dayWaitFor2ndNum) {
        newDay = parseInt(key, 10) - 1;
        wait = true;
      } else {
        newDay = (newDay + 1) * 10 - 1;
        newDay += parseInt(key, 10);
        wait = false;
        moveToNext = true;
      }
      break;
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (!this.state.dayWaitFor2ndNum) {
        newDay = parseInt(key, 10) - 1;
      } else {
        newDay = (newDay + 1) * 10 - 1;
        newDay += parseInt(key, 10);
      }
      moveToNext = true;
      break;
    default:
      return;
    }

    newDay = this.adjustDay(newDay);

    let newEditIndex = this.state.editIndex;
    if (moveToNext) {
      newEditIndex += 1;

      if (newEditIndex > 2) {
        newEditIndex = -1;
      }
    }

    this.setState({
      day: newDay,
      editIndex: newEditIndex,
      dayWaitFor2ndNum: wait
    });
  }

  adjustDay(day) {
    let d = Math.max(0, day);
    d = Math.min(d, 30);

    if (['04', '06', '09', '11'].indexOf(this.getMonth()) >= 0) {
      d = Math.min(d, 29);
    }

    if (this.getMonth() === '02') {
      if (this.isLeapYear()) {
        d = Math.min(d, 28);
      } else {
        d = Math.min(d, 27);
      }
    }

    return d;
  }

  isLeapYear() {
    return this.state.year % 4 === 0 && this.state.year % 400 !== 0;
  }

  handleKeyYear(key) {
    let newYear = this.state.year;
    let moveToNext = false;
    let inputCnt = this.state.yearInputCnt;
    let newEditIndex = this.state.editIndex;

    switch (key) {
    case 'ArrowUp':
      newYear += 1;
      inputCnt = 0;
      break;
    case 'ArrowDown':
      newYear -= 1;
      inputCnt = 0;
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      if (inputCnt == 0) {
        newYear = 0;
      }
      newYear *= 10;
      newYear += parseInt(key, 10);
      inputCnt += 1;
      if (inputCnt == 4) {
        inputCnt = 0;
        newEditIndex = 0;
      }
      break;
    default:
      return;
    }

    newYear = Math.min(9999, newYear);
    newYear = Math.max(0, newYear);

    this.setState({
      year: newYear,
      yearInputCnt: inputCnt,
      editIndex: newEditIndex
    });
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
