import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/actions';
import { editProfile, getUserData } from '../../store/actions';

import 'react-toastify/dist/ReactToastify.css';

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
    <div className="wrapper">
      <div className="title">
        <h2>Edit Profile</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <label htmlFor="username" className="form__field">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="username"
          className="form__input"
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
        <label htmlFor="email" className="form__field">
          Email
        </label>
        <input
          type="email"
          placeholder="email address"
          className="form__input"
          defaultValue={userData.email}
          {...register('email', {
            required: true,
            pattern: {
              value: /^([a-z0-9_])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
              message: 'Start with lowercase letter and use only valid characters',
            },
          })}
        />
        <label htmlFor="password" className="form__field">
          New password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Type yor new password"
          className="form__input"
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
        />
        <label htmlFor="avatar" className="form__field">
          Avatar image
        </label>
        <input
          id="avatar"
          type="url"
          placeholder="Avatar"
          className="form__input"
          defaultValue={userData.image || null}
          {...register('image', {
            pattern: {
              value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&/=]*)$/,
              message: 'correct url is required',
            },
          })}
        />
        <input type="submit" className="form__button" value="Save" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
  userData: state.userData.userData,
});

export default connect(mapStateToProps, actions)(Profile);
