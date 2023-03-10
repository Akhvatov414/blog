import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import routes from '../routes';
import { createArticle } from '../../store/actions';
import ArticleForm from '../articleForm/ArticleForm';

const NewArticleForm = ({ isAuth }) => {
  if (!isAuth) return <Redirect to={routes.signIn} />;
  return <ArticleForm submitFunc={createArticle} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
});

export default connect(mapStateToProps)(NewArticleForm);
