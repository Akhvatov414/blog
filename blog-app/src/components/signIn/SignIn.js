import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import * as actions from '../../store/actions';

import 'react-toastify/dist/ReactToastify.css';

const SignIn = ({ signIn, history }) => {
  console.log(history);
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
          alert('incorrect login or password');
          console.log(errors);
        } else {
          reset();
          history.push('/');
          alert('Success login');
        }
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
  return (
    <div className="loginPage">
      <div className="title">Sign in</div>
      <form name="loginForm" className="loginPage__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="loginPage__field">
          Email
        </label>
        <input
          type="email"
          placeholder="email address"
          {...register('email', {
            required: true,
            pattern: {
              value: /^([a-z0-9_])([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
              message: 'Start with lowercase letter and use only valid characters',
            },
          })}
        />
        <label htmlFor="password" className="loginPage__field">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="password"
          {...register('password', {
            required: true,
            minLength: 6,
            maxLength: 40,
          })}
        />
        <input type="submit" className="loginPage__submit" value="login" {...register('submit')} />
      </form>
    </div>
  );
};

export default connect(null, actions)(withRouter(SignIn));
