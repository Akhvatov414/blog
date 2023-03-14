import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/actions';
import routes from '../routes';

import 'react-toastify/dist/ReactToastify.css';
import style from './index.module.scss';

const SignIn = ({ signIn, history }) => {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = ({ email, password }) => {
    signIn(email, password)
      .then((res) => {
        if (res.errors) {
          setError('submit', {
            type: 'server',
            message: 'incorrect login or password',
          });
          toast.error('incorrect login or password');
        } else {
          reset();
          history.push('/');
          toast.success('Success login');
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className={style.loginPage}>
      <div className={style.loginPage__title}>Sign in</div>
      <form name="loginForm" className={style.loginPage__form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={style.loginPage__label}>
          Email
          <br />
          <input
            type="email"
            placeholder="email address"
            className={
              errors.email ? `${style.loginPage__input} ${style.loginPage__input_error}` : `${style.loginPage__input}`
            }
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^([a-z0-9_])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Start with lowercase letter and use only valid characters',
              },
            })}
          />
          {errors?.email && <p className={style.loginPage__text}>{errors.email?.message?.toString()}</p>}
        </label>
        <label htmlFor="password" className={style.loginPage__label}>
          Password
          <br />
          <input
            id="password"
            type="password"
            className={
              errors.password
                ? `${style.loginPage__input} ${style.loginPage__input_error}`
                : `${style.loginPage__input}`
            }
            placeholder="password"
            {...register('password', {
              required: 'Password is required',
              maxLength: {
                value: 40,
                message: 'Are you sure about that?',
              },
            })}
          />
          {errors?.password && <p className={style.loginPage__text}>{errors.password?.message?.toString()}</p>}
        </label>
        <input type="submit" className={style.loginPage__button} value="login" {...register('submit')} />
      </form>
      <div className={style.loginPage__footer}>
        Don`t have an account?{' '}
        <Link to={routes.signUp} className={style.loginPage__link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default connect(null, actions)(withRouter(SignIn));
