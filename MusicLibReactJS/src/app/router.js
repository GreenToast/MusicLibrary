import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import TypeContainer from './container/type.container';
import TypeListContainer from './container/type-list.container';
import OverviewComponent from './component/overview.component';

export default (
  <Router history={browserHistory}>
      <Route path="/" component={OverviewComponent} />

        <Route path="overview" component={OverviewComponent} />

        <Route path="/overview/:type">
            <IndexRoute component={TypeListContainer} />
        </Route>

        <Route path="/:type/:id">
            <IndexRoute component={TypeContainer} />
        </Route>
  </Router>
);