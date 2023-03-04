import React from 'react';

import style from './index.module.scss';

const Header = () => {
  return (
    <div className={style.header}>
      <h1 className={style.header__title}>Realworld Blog</h1>
      <div className={style.header__menu}>
        <div>Sign in</div>
        <div>Sign up</div>
      </div>
    </div>
  );
};

export default Header;
