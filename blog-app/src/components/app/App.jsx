import React from 'react';
import { connect } from 'react-redux';

import ArticleList from '../articleList/ArticleList';
import Header from '../header/Header';
import * as actions from '../../store/actions';

import './index.module.scss';

const App = () => {
  return (
    <div className="app">
      <Header />
      <ArticleList />
    </div>
  );
};

export default connect(null, actions)(App);
