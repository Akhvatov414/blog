import React from 'react';

import ArticleList from '../articleList/ArticleList';
import Header from '../header/Header';

import './index.module.scss';

const App = () => {
  return (
    <div className="app">
      <Header />
      <ArticleList />
    </div>
  );
};

export default App;
