import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { message, Popconfirm } from 'antd';

import * as actions from '../../store/actions';
//import ArticleItem from '../articleItem/ArticleItem';
import { getArticle, deleteArticle } from '../../store/actions';

import style from './index.module.scss';

const ArticleRead = ({ slug, userData, history }) => {
  console.log(userData.username);
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

  const confirmDelete = () => {
    deleteArticle(slug).then((res) => {
      if (res.ok) {
        history.push('/');
        message.success('Deleted successfully!');
      } else {
        message.error('Failed. Try one more time');
      }
    });
  };

  const cancelDelete = () => {
    message.error('You abort operation');
  };

  const editButtons =
    username !== userData.username ? null : (
      <>
        <Popconfirm
          title="Delete the article"
          description="Are you sure to delete this article?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className={`${style.button} ${style.button_delete}`}>
            Delete
          </button>
        </Popconfirm>
        <button
          onClick={() => history.push(`/articles/${slug}/edit`)}
          type="button"
          className={`${style.button} ${style.button_edit}`}
        >
          Edit
        </button>
      </>
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
        </div>
        <div className={style.articleItem__userInfo}>
          <div className={style.articleItem__info}>
            <div className={style.articleItem__username}>{username}</div>
            <div className={style.articleItem__date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</div>
          </div>
          <img src={image} className={style.articleItem__avatar} alt="avatar picture" />
        </div>
      </div>
      <div className={style.articleItem__description}>
        {description}
        <div className={style.buttons}>{editButtons}</div>
      </div>
      <div className={style.articleItem__text}>
        {/* eslint-disable-next-line react/no-children-prop */}
        <ReactMarkdown children={body} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
  userData: state.userData.userData,
});

export default connect(mapStateToProps, actions)(withRouter(ArticleRead));
