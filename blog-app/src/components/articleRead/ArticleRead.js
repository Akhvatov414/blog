import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
//import { v4 as uuidv4 } from 'uuid';
//import { format } from 'date-fns';

import { getArticle } from '../../store/actions';
//import ArticleItem from '../articleItem/ArticleItem';

//import style from './index.module.scss';

const ArticleRead = ({ slug }) => {
  const [status, setStatus] = useState('loading');
  const [article, setArticle] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    getArticle(slug)
      .then((item) => {
        setStatus('loaded');
        setArticle(item);
        setIsMounted(true);
      })
      .catch(() => setStatus('error'));
  }, [slug]);
  //   console.log(username);
  //   console.log(image);
  //   console.log(createdAt);
  //   console.log(description);
  //   console.log(favoritesCount);
  //   console.log(tagList);
  //   console.log(title);
  //   console.log(isMounted);
  console.log(isMounted);
  console.log(status);
  let { title } = article ?? {};
  console.log(title);
  return (
    <div>
      <div>{title}</div>
    </div>
  );

  //   return (
  //     <div className={`${style.articleItem}`}>
  //       <div className={style.articleItem__articleInfo}>
  //         <button type="button" className={style.articleItem__header} onClick={() => history.push(`/articles/${slug}`)}>
  //           {title}
  //         </button>
  //         <button type="button" className={style.articleItem__likeButton}>
  //           {favoritesCount}
  //         </button>
  //         <ul className={style.articleItem__tagList}>{tagsList}</ul>
  //         <div className={style.articleItem__description}>{description}</div>
  //       </div>
  //       <div className={style.articleItem__userInfo}>
  //         <div className={style.articleItem__info}>
  //           <div className={style.articleItem__username}>{username}</div>
  //           <div className={style.articleItem__date}>{format(new Date(createdAt), 'MMMM d, yyyy')}</div>
  //         </div>
  //         <img src={image} className={style.articleItem__avatar} alt="avatar picture" />
  //       </div>
  //     </div>
  //   );
};

export default withRouter(ArticleRead);
