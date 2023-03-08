import React from 'react';
import { withRouter } from 'react-router-dom';

import style from './index.module.scss';

const Header = ({ history }) => {
  return (
    <div className={style.header}>
      <h1 className={style.header__title} onClick={() => history.push('/')}>
        Realworld Blog
      </h1>
      <div className={style.header__menu}>
        <button type="button" onClick={() => history.push('/sign-in')}>
          Sign in
        </button>
        <button type="button" onClick={() => history.push('/sign-up')}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default withRouter(Header);
