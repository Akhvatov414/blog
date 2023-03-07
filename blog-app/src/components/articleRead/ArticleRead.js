import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

//import * as actions from '../../store/actions';
//import ArticleItem from '../articleItem/ArticleItem';
import { getArticle } from '../../store/actions';

import style from './index.module.scss';

const ArticleRead = ({ slug }) => {
  const [article, setArticle] = useState({});
  useEffect(() => {
    getArticle(slug)
      .then((item) => {
        setArticle(item);
      })
      .catch((e) => console.log(e));
  }, []);

  if (!article.author) return;
  const {
    author: { username, image },
    createdAt,
    description,
    //favorited,
    favoritesCount,
    tagList,
    title,
    body,
  } = article;

  const tagsList = Object.values(tagList).map((tag) =>
    tag.length === 0 ? null : (
      <li key={uuidv4()} className={style.articleItem__tag}>
        {tag}
      </li>
    )
  );

  return (
    <div className={`${style.articleItem} ${style.articleItem_preview}`}>
      <div className={style.articleItem__wrapper}>
        <div className={style.articleItem__articleInfo}>
          <button type="button" className={style.articleItem__header} onClick={() => history.push(`/articles/${slug}`)}>
            {title}
          </button>
          <button type="button" className={style.articleItem__likeButton}>
            {favoritesCount}
          </button>
          <ul className={style.articleItem__tagList}>{tagsList}</ul>
          <div className={style.articleItem__description}>{description}</div>
        </div>
        <div className={style.articleItem__userInfo}>
          <div className={style.articleItem__info}>
            <div className={style.articleItem__username}>{username}</div>
            <div className={style.articleItem__date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</div>
          </div>
          <img src={image} className={style.articleItem__avatar} alt="avatar picture" />
        </div>
      </div>
      <div className={style.articleItem__text}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={body} />
      </div>
    </div>
  );
};

export default withRouter(ArticleRead);
