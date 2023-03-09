import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions';

import style from './index.module.scss';

const Header = ({ history, isAuth, userData }) => {
  console.log(isAuth);
  console.log(userData);
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

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
  userData: state.userData.userData,
});

export default connect(mapStateToProps, actions)(withRouter(Header));
