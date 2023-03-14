import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import { setFavorite, deleteFavorite } from '../../store/actions';

import style from './index.module.scss';

const ArticleItem = ({ data, history, bodyStatus = false }) => {
  const [isFavorite, setIsFavorite] = useState(data?.favorited);
  const [counter, setCounter] = useState(data?.favoritesCount);
  useEffect(() => {}, [isFavorite]);
  const {
    author: { username, image },
    createdAt,
    description,
    slug,
    tagList,
    title,
    body,
  } = data;

  const submitFavorite = () => {
    if (isFavorite) {
      deleteFavorite(slug).then((res) => {
        setIsFavorite(res.article.favorited);
        setCounter(counter - 1);
      });
    } else {
      setFavorite(slug).then((res) => {
        setIsFavorite(res.article.favorited);
        setCounter(counter + 1);
      });
    }
  };

  const showBody = !bodyStatus ? null : (
    <div className={style.articleItem__text}>
      {/* eslint-disable-next-line react/no-children-prop */}
      <ReactMarkdown children={body} />
    </div>
  );
  const tagsList = Object.values(tagList).map((tag) =>
    tag.length === 0 ? null : (
      <li key={uuidv4()} className={style.articleItem__tag}>
        {tag}
      </li>
    )
  );

  const favoriteIcon = isFavorite ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />;
  return (
    <div className={`${style.articleItem} ${style.articleItem_preview}`}>
      <div className={style.articleItem__wrapper}>
        <div className={style.articleItem__articleInfo}>
          <button type="button" className={style.articleItem__header} onClick={() => history.push(`/articles/${slug}`)}>
            {title}
          </button>
          <button type="button" className={style.articleItem__likeButton} onClick={submitFavorite}>
            {favoriteIcon} {counter}
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
      {showBody}
    </div>
  );
};

export default withRouter(ArticleItem);
