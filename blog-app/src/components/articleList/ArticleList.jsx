import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import ArticleItem from '../articleItem/ArticleItem';

import style from './index.module.scss';

const ArticleList = ({ getArticles, articles, page = 1 }) => {
  useEffect(() => {
    getArticles(page);
  }, [getArticles, page]);

  const getList = articles.map((i) => (
    <li key={i.slug}>
      <ArticleItem data={i} />
    </li>
  ));
  console.log(getList);
  return <div className={style.wrapperList}>
    <ul className='List'>
      {getList}
    </ul>
  </div>;
};

const mapStateToProps = (state) => ({
  articles: state.articles.articles,
});

export default connect(mapStateToProps, actions)(ArticleList);
