import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ResultsRankedTable } from '../components/ResultsRankedTable/ResultsRankedTable';
import { ResultsTable } from '../components/ResultsTable/ResultsTable';

const CustomLink = data => (
  <div>
    <div className="anchor anchor--flex">
      <MenuLink to="/table-results/ranked" label="Ranked" />
      <MenuLink to="/table-results/default" label="Default" />
    </div>

    <Route
      path="/table-results/ranked"
      render={() => (
        <ResultsRankedTable data={data} />
      )}
    />
    <Route
      path="/table-results/default"
      render={() => (
        <ResultsTable data={data} />
      )}
    />
  </div>
);

const MenuLink = ({ label, to, activeOnlyWhenExact = false }) => (
  <Route
    path={to}
    exact={activeOnlyWhenExact}
    children={({ match }) => (
      <div className={match ? 'active' : ''}>
        {/* <Link className="anchor__btn" to={to}>{label}</Link> */}
        <Link className={`anchor__btn ${match ? 'anchor__btn--active' : ''}`} to={to}>{label}</Link>
      </div>
    )}
  />
);

MenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  activeOnlyWhenExact: PropTypes.bool.isRequired,
};


class Results extends Component {
  render() {
    const { data } = this.props;
    return CustomLink(data);
  }
}

Results.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = store => ({
  data: store.data,
});

export default connect(
  mapStateToProps,
)(Results);
