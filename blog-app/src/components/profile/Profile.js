import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/actions';
import { editProfile, getUserData } from '../../store/actions';

import 'react-toastify/dist/ReactToastify.css';
import style from './index.module.scss';

const Profile = ({ setUserData, isAuth, userData }) => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
    reset,
  } = useForm({
    mode: 'onChange',
  });
  if (!isAuth) return <Redirect to="/sign-in" />;
  getUserData().then((res) => console.log(res.user.image));
  const onSubmit = ({ username, email, password, image }) => {
    editProfile(username, email, password, image)
      .then((body) => {
        localStorage.setItem('token', JSON.stringify(body.user.token));
        console.log(body);
        setUserData(body.user.username, body.user.email, body.user.image);
      })
      .catch((e) => toast.error(e));
    reset();
  };
  return (
    <div className={style.wrapper}>
      <div className={style.wrapper__title}>
        <h2>Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.wrapper__form}>
        <label htmlFor="username" className={style.wrapper__label}>
          Username
          <br />
          <input
            id="username"
            type="text"
            placeholder="username"
            className={style.wrapper__input}
            defaultValue={userData.username}
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: {
                value: /^[a-z0-9]*$/,
                message: 'You can only use lowercase English letters and numbers',
              },
            })}
          />
        </label>
        <label htmlFor="email" className={style.wrapper__label}>
          Email
          <br />
          <input
            type="email"
            placeholder="email address"
            className={style.wrapper__input}
            defaultValue={userData.email}
            {...register('email', {
              required: true,
              pattern: {
                value: /^([a-z0-9_])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Start with lowercase letter and use only valid characters',
              },
            })}
          />
        </label>
        <label htmlFor="password" className={style.wrapper__label}>
          New password
          <br />
          <input
            id="password"
            type="password"
            placeholder="Type yor new password"
            className={style.wrapper__input}
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
          />
        </label>
        <label htmlFor="avatar" className={style.wrapper__label}>
          Avatar image
          <br />
          <input
            id="avatar"
            type="url"
            placeholder="Avatar"
            className={style.wrapper__input}
            defaultValue={userData.image || null}
            {...register('image', {
              pattern: {
                value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&/=]*)$/,
                message: 'correct url is required',
              },
            })}
          />
        </label>
        <input type="submit" className={style.wrapper__button} value="Save" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
  userData: state.userData.userData,
});

export default connect(mapStateToProps, actions)(Profile);
