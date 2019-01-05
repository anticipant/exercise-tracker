import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
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


class Results extends Component {
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>

        {/* <CustomLink data={data}/> */}
        {CustomLink(data)}

        {/* <div className="anchor anchor--flex"> */}
        {/* <Link className="anchor__btn" to="/table-results/ranked">Ranked</Link> */}
        {/* <Link className="anchor__btn" to="/table-results/default">Default</Link> */}
        {/* </div> */}

        {/* {data.results.length ? ( */}
        {/* <React.Fragment> */}
        {/* <Route path="/table-results/ranked" render={() => { */}
        {/* return ( */}
        {/* <ResultsRankedTable data={data} /> */}
        {/* ) */}
        {/* }} /> */}
        {/* <Route path="/table-results/default" render={() => { */}
        {/* return ( */}
        {/* <ResultsTable data={data} /> */}
        {/* ) */}
        {/* }} /> */}
        {/* </React.Fragment> */}
        {/* ) : ( */}
        {/* <div>У вас еще не было тренировок</div> */}
        {/* )} */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => ({
  data: store.data,
});

export default connect(
  mapStateToProps,
)(Results);
