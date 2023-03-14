import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getArticle, editArticle } from '../../store/actions';
import ArticleForm from '../articleForm/ArticleForm';

const EditArticleForm = ({ slug }) => {
  const [article, setArticle] = useState();
  const [pageStatus, setPageStatus] = useState('loading');
  useEffect(() => {
    getArticle(slug)
      .then((item) => {
        setPageStatus('loaded');
        setArticle(item);
      })
      .catch(() => setPageStatus('Error'));
  }, [slug]);

  if (pageStatus === 'loading') return <div>Loading...</div>;

  return <ArticleForm slug={slug} pageStatus="edit" article={article} submitFunc={editArticle} />;
};

export default connect(null)(EditArticleForm);
