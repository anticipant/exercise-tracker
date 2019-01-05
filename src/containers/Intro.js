import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveResult } from '../actions/IntroActions';
import { Stopwatch } from '../components/Stopwatch/Stopwatch';

class Intro extends Component {
  render() {
    const { data, saveResult } = this.props;
    return (
      <React.Fragment>
        <div>
Last RESULT:
          {data.results[0].result}
        </div>
        <Stopwatch saveResult={saveResult} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  data: store.data,
});
const mapDispatchToProps = dispatch => ({
  saveResult: currentResult => dispatch(saveResult(currentResult)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
