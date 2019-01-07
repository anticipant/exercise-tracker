import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './Stopwatch.scss';

const KeyCode = {
  SPACE: 32,
};

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 0,
      referrer: null,
    };
    this.running = false;
    this.reset();
  }

  componentDidMount() {
    this.print(this.times);
    document.addEventListener('keyup', this.toggleStopWatch);
  }

  componentWillUnmount() {
    this.stop();
    document.removeEventListener('keyup', this.toggleStopWatch);
  }

  pad0 = (value, count) => {
    let result = value.toString();
    for (let i = count; result.length < i; i -= 1) {
      result = `0${result}`;
    }
    return result;
  };

  handleSaveResult = () => {
    const { saveResult } = this.props;
    const { display } = this.state;

    this.setState({ referrer: '/table-results/default' });
    saveResult(display);
  };

  toggleStopWatch = (evt) => {
    if (evt.keyCode === KeyCode.SPACE) {
      if (this.running) {
        this.stop();
      } else {
        this.start();
      }
    }
  };

  restart = () => {
    if (!this.time) {
      this.time = performance.now();
    }
    if (this.running) {
      requestAnimationFrame(this.step.bind(this));
    } else {
      this.stop();
    }
    this.reset();
    this.print();
  };

  stop = () => {
    this.running = false;
    this.time = null;
  };


  start = () => {
    if (!this.time) {
      this.time = performance.now();
    }
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  };


  step(timestamp) {
    if (!this.running) return;
    this.calculate(timestamp);
    this.time = timestamp;
    this.print();
    requestAnimationFrame(this.step.bind(this));
  }

  calculate(timestamp) {
    const diff = timestamp - this.time;
    // Hundredths of a second are 100 ms
    this.times[2] += diff / 10;
    // Seconds are 100 hundredths of a second
    if (this.times[2] >= 100) {
      this.times[1] += 1;
      this.times[2] -= 100;
    }
    // Minutes are 60 seconds
    if (this.times[1] >= 60) {
      this.times[0] += 1;
      this.times[1] -= 60;
    }
  }

  print() {
    this.setState({
      display: this.format(this.times),
    });
  }

  format(times) {
    return `${this.pad0(times[0], 2)}:${this.pad0(times[1], 2)}:${this.pad0(Math.floor(times[2]), 2)}`;
  }

  reset() {
    this.times = [0, 0, 0];
  }

  render() {
    const { referrer, display } = this.state;
    const { lastResult } = this.props;
    if (referrer) return <Redirect to={referrer} />;
    return (
      <div className="Stopwatch">
        {lastResult ? (
          <div className="Stopwatch__last-result">
            Last RESULT: $
            {lastResult}
          </div>
        ) : null}

        <nav className="Stopwatch__controls">
          <button type="button" className="Stopwatch__controls-button Stopwatch__controls-button--start" onClick={this.start}>Start</button>
          <button type="button" className="Stopwatch__controls-button Stopwatch__controls-button--stop" onClick={this.stop}>Stop</button>
          <button type="button" className="Stopwatch__controls-button" onClick={this.restart}>Restart</button>
          <button type="button" className="Stopwatch__controls-button" onClick={this.handleSaveResult}>Save</button>
        </nav>
        <div className="Stopwatch__display">{display}</div>
      </div>
    );
  }
}

Stopwatch.propTypes = {
  saveResult: PropTypes.func.isRequired,
  lastResult: PropTypes.string,
};
Stopwatch.defaultProps = {
  lastResult: null,
};
