import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ArticleList from '../articleList/ArticleList';
import Header from '../header/Header';
import * as actions from '../../store/actions';
import routes from '../routes';
import './index.module.scss';
import ArticleRead from '../articleRead/ArticleRead';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';
import Profile from '../profile/Profile';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route
            path={routes.article}
            render={({ match }) => {
              const { slug } = match.params;
              return <ArticleRead slug={slug} />;
            }}
            exact
          />
          <Route path={routes.signIn} component={SignIn} />
          <Route path={routes.signUp} component={SignUp} />
          <Route
            path={routes.base}
            render={({ match }) => {
              const { page } = match.params;
              return <ArticleList page={page} />;
            }}
            exact
          />
          <Route path={routes.profile} component={Profile} />
        </Switch>
      </div>
    </Router>
  );
};

export default connect(null, actions)(App);
