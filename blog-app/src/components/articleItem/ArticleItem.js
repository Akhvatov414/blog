import React from 'react';

const ArticleItem = ({ data }) => {
  const { title } = data;
  return <div>{title}</div>;
};

export default ArticleItem;
