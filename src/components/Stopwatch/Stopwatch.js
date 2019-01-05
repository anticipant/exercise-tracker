import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


const KeyCode = {
  SPACE: 32,
};

export class Stopwatch extends React.Component {
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

  toggleStopWatch = (evt) => {
    if (evt.keyCode === KeyCode.SPACE) {
      console.log('SPACE');
      this.running ? this.stop() : this.start();
    }
  };

  reset() {
    this.times = [0, 0, 0];
  }

  start = () => {
    if (!this.time) {
      this.time = performance.now();
    }
    if (!this.running) {
      this.running = true;
      requestAnimationFrame(this.step.bind(this));
    }
  };

  stop = () => {
    this.running = false;
    this.time = null;
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

  pad0 = (value, count) => {
    let result = value.toString();
    for (; result.length < count; --count) result = `0${result}`;
    return result;
  };

  handleSaveResult = () => {
    // console.log(this.state.display);
    this.setState({ referrer: '/table-results/default' });
    this.props.saveResult(this.state.display);
  };

  render() {
    const { referrer } = this.state;
    if (referrer) return <Redirect to={referrer} />;
    return (
      <div>
        <nav className="controls">
          <span className="controls__button controls__button--start" onClick={this.start}>Start</span>
          <span className="controls__button controls__button--stop" onClick={this.stop}>Stop</span>
          <span className="controls__button" onClick={this.restart}>Restart</span>
          <span className="controls__button" onClick={this.handleSaveResult}>Save</span>
        </nav>
        <div className="stopwatch">{this.state.display}</div>
      </div>
    );
  }
}

Stopwatch.propTypes = {
  saveResult: PropTypes.func.isRequired,
};
