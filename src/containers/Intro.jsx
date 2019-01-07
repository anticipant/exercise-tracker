import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveResult } from '../actions/IntroActions';
import Stopwatch from '../components/Stopwatch/Stopwatch';

const Intro = ({ data, saveResultAction }) => (
  <Stopwatch
    saveResult={saveResultAction}
    lastResult={data.results[0] ? data.results[0].result : null}
  />
);

Intro.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.array.isRequired,
  }).isRequired,
  saveResultAction: PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  data: store.data,
});
const mapDispatchToProps = dispatch => ({
  saveResultAction: currentResult => dispatch(saveResult(currentResult)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro);
