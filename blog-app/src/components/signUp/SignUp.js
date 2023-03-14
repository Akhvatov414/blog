import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { regUser } from '../../store/actions';
import routes from '../routes';

import 'react-toastify/dist/ReactToastify.css';
import style from './index.module.scss';

function SignUp({ history }) {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onChange',
  });
  const psswrd = watch('password', '');
  const onSubmit = ({ username, email, password }) => {
    regUser(username, email, password)
      .then((res) => {
        console.log(res);
        if (res.errors) {
          if (res.errors.username) {
            setError('username', {
              type: 'server',
              message: res.errors.username,
            });
          }
          if (res.errors.email) {
            setError('email', {
              type: 'server',
              message: res.errors.email,
            });
          }
          if (res.errors.password) {
            setError('password', {
              type: 'server',
              message: res.errors.password,
            });
          }
          return;
        }
        toast.success('Success!!!');
        history.push(routes.signIn);
      })
      .catch((e) => {
        console.log(errors);
        toast.error(e.message);
      });
    reset();
  };
  return (
    <div className={`${style.regPage}`}>
      <div className={style.regPage__title}>Create new account</div>
      <form name="regForm" className={style.regPage__form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className={style.regPage__label}>
          Username
          <br />
          <input
            id="username"
            type="text"
            placeholder="username"
            className={
              errors.username ? `${style.regPage__input} ${style.regPage__input_error}` : `${style.regPage__input}`
            }
            {...register('username', {
              required: 'Username is requiered',
              minLength: {
                value: 3,
                message: 'Your username needs to contain minimum 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username needs to contain maximum 20 characters.',
              },
              message: 'Your login must contain from 3 to 20 characters',
              pattern: {
                value: /^[a-zA-Z0-9_\-.]*$/,
                message: 'You can only use English letters and numbers',
              },
            })}
          />
          {errors?.username && <p className={style.regPage__text}>{errors.username?.message?.toString()}</p>}
        </label>
        <label htmlFor="email" className={style.regPage__label}>
          Email
          <br />
          <input
            type="email"
            placeholder="email address"
            className={
              errors.email ? `${style.regPage__input} ${style.regPage__input_error}` : `${style.regPage__input}`
            }
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^([a-z0-9_])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
                message: 'Start with lowercase letter and use only valid characters',
              },
            })}
          />
          {errors?.email && <p className={style.regPage__text}>{errors.email?.message?.toString()}</p>}
        </label>
        <label htmlFor="password" className={style.regPage__label}>
          Password
          <br />
          <input
            id="password"
            type="password"
            placeholder="password"
            className={
              errors.password ? `${style.regPage__input} ${style.regPage__input_error}` : `${style.regPage__input}`
            }
            {...register('password', {
              required: 'Password is requiered',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Password must contains maximum 6 characters',
              },
            })}
          />
          {errors?.password && <p className={style.regPage__text}>{errors.password?.message?.toString()}</p>}
        </label>
        <label htmlFor="checkbox" className={style.regPage__label}>
          Confirm password
          <br />
          <input
            id="confirmPassword"
            type="password"
            placeholder="password"
            className={
              errors.repeatPassword
                ? `${style.regPage__input} ${style.regPage__input_error}`
                : `${style.regPage__input}`
            }
            {...register('repeatPassword', {
              required: 'Repeat password is required',
              validate: (pass) => pass === psswrd || 'Passwords must match',
            })}
          />
          {errors?.repeatPassword && (
            <p className={style.regPage__text}>{errors.repeatPassword?.message?.toString()}</p>
          )}
        </label>
        <label htmlFor="checkbox" className={style.regPage__checkbox}>
          <input
            id="checkbox"
            type="checkbox"
            name="agrCheckbox"
            onChange={() => {}}
            {...register('checkbox', {
              required: 'Agreement is required',
            })}
          />
          I agree to the processing of my personal information
          {errors?.checkbox && <p className={style.regPage__text}>{errors.checkbox?.message?.toString()}</p>}
        </label>
        <input type="submit" className={style.regPage__button} value="Create" />
      </form>
      <div className={style.regPage__footer}>
        Already have an account?{' '}
        <Link to={routes.signIn} className={style.regPage__link}>
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
