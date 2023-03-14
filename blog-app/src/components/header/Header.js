import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { removeToken } from '../../services/authAPI';
import * as actions from '../../store/actions';
import defaultAvatar from '../icon/profile.png';

import style from './index.module.scss';

const Header = ({ history, isAuth, userData, setLogIn }) => {
  const { username, image } = userData;
  const logOut = () => {
    removeToken();
    setLogIn(false);
  };
  if (isAuth) {
    return (
      <div className={style.header}>
        <h1 className={style.header__title} onClick={() => history.push('/')}>
          Realworld Blog
        </h1>
        <div className={style.header__menu}>
          <button
            type="button"
            className={`${style.header__button} ${style.header__button_create}`}
            onClick={() => history.push('/new-article')}
          >
            Create article
          </button>
          <Link to="/profile" className={style.header__wrapper}>
            <div className={style.header__text}>{username}</div>
            <img src={image || defaultAvatar} className={style.header__userImg} alt="Avatar" />
          </Link>
          <button type="button" className={`${style.header__button} ${style.header__button_logOut}`} onClick={logOut}>
            Log Out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={style.header}>
      <h1 className={style.header__title} onClick={() => history.push('/')}>
        Realworld Blog
      </h1>
      <div className={style.header__menu}>
        <button
          type="button"
          className={`${style.header__button} ${style.header__button_signIn}`}
          onClick={() => history.push('/sign-in')}
        >
          Sign in
        </button>
        <button
          type="button"
          className={`${style.header__button} ${style.header__button_signUp}`}
          onClick={() => history.push('/sign-up')}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
  userData: state.userData.userData,
});

export default connect(mapStateToProps, actions)(withRouter(Header));
