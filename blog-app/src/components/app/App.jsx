import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ArticleList from '../articleList/ArticleList';
import Header from '../header/Header';
import * as actions from '../../store/actions';
import routes from '../routes';
import './index.module.scss';
import ArticleRead from '../articleRead/ArticleRead';
import SignIn from '../signIn/SignIn';
import SignUp from '../signUp/SignUp';
import Profile from '../profile/Profile';
import { getToken } from '../../services/authAPI';
import NewArticleForm from '../newArticleForm/NewArticleForm';
import EditArticleForm from '../editArticleForm/EditArticleForm';

const App = ({ validateUser }) => {
  useEffect(() => {
    if (getToken()) {
      validateUser();
    }
  });
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
          <Route path={routes.newArticle} component={NewArticleForm} />
          <Route
            path={routes.editArticle}
            render={({ match }) => {
              const { slug } = match.params;
              return <EditArticleForm slug={slug} />;
            }}
          />
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
      <ToastContainer
        position="top-center"
        hideProgressBar
        pauseOnHover={false}
        theme="colored"
        style={{ width: '250px' }}
      />
    </Router>
  );
};

export default connect(null, actions)(App);
