import React from 'react';
import { HashRouter as Router, Link, Route } from 'react-router-dom';
import Results from './Results';
import Intro from './Intro';

const App = () => (
  <div className="app">
    <Router>
      <React.Fragment>
        <div className="anchor anchor--flex">
          <Link className="anchor__btn" to="/">Start train</Link>
          <Link className="anchor__btn" to="/table-results/ranked">Show results</Link>
        </div>

        <Route exact path="/" component={Intro} />
        <Route path="/table-results" component={Results} />

      </React.Fragment>
    </Router>
  </div>
);

export default App;
