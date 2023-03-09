import React from 'react';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import { regUser } from '../../store/actions';
import routes from '../routes';

import 'react-toastify/dist/ReactToastify.css';

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
            console.log(errors);
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
    <div className="regPage">
      <div className="regTitle">Create new account</div>
      <form name="regForm" className="regPage__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="regForm__field">
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="username"
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
        <label htmlFor="email" className="regForm__field">
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
        <label htmlFor="password" className="regForm__field">
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
        <label htmlFor="checkbox" className="regForm__field">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="password"
          {...register('repeatPassword', {
            required: true,
            validate: (pass) => pass === psswrd || 'The passwords do not match',
          })}
        />
        <input
          id="checkbox"
          type="checkbox"
          name="agrCheckbox"
          onChange={() => {}}
          {...register('checkbox', {
            required: 'Agreement is required',
          })}
        />
        <label htmlFor="checkbox" className="regForm__checkbox">
          I agree to the processing of my personal information
        </label>
        <input type="submit" className="regForm__submit" value="Create" />
      </form>
    </div>
  );
}

export default withRouter(SignUp);
