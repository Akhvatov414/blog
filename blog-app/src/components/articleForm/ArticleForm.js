import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes';

import style from './index.module.scss';

const ArticleForm = ({ isAuth, pageStatus, submitFunc, article, slug, history }) => {
  const {
    register,
    //formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: article
      ? {
          title: article.title,
          description: article.description,
          body: article.body,
          tags: article.tagList.map((t, i) => ({ tag: article.tagList[i] })),
        }
      : null,
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  });
  if (!isAuth) return <Redirect to="/sign-in" />;
  const onSubmit = ({ title, description, body, tags }) => {
    const tagsArr = tags.map((tag, i) => tags[i].tag);
    submitFunc(title, description, body, tagsArr, slug)
      .then((res) => {
        if (res.ok) {
          toast.success('Success');
          history.push(routes.base);
        } else if (res.status === 401) {
          toast.error('Not authorized');
        } else {
          toast.error('Error!');
        }
      })
      .catch((e) => toast.error(e.message));
    reset();
  };
  return (
    <div className={style.articleForm}>
      <div className={style.articleForm__header}>{pageStatus === 'edit' ? 'Edit article' : 'Create new article'}</div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.articleForm__form}>
        <label htmlFor="title" className={style.articleForm__label}>
          Title
        </label>
        <input
          id="title"
          type="text"
          className={`${style.articleForm__input} ${style.articleForm__input_title}`}
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <label htmlFor="description" className={style.articleForm__label}>
          Description
        </label>
        <input
          type="text"
          className={`${style.articleForm__input} ${style.articleForm__input_descriprion}`}
          placeholder="Description"
          {...register('description', { required: true })}
        />
        <label htmlFor="body" className={style.articleForm__label}>
          Text
        </label>
        <textarea
          type="text"
          className={`${style.articleForm__input} ${style.articleForm__input_body}`}
          placeholder="Text"
          {...register('body', { required: true })}
        />
        <div className={style.articleForm__label}>
          <span>Tags</span>
          <section className={style.articleForm__section}>
            <ul className={style.articleForm__list}>
              {fields.map((field, index) => (
                <li key={field.id} className={style.articleForm__tag}>
                  <input
                    type="text"
                    placeholder="Tag"
                    className={`${style.articleForm__inputTag}`}
                    {...register(`tags.${index}.tag`)}
                  />
                  <button
                    type="button"
                    className={`${style.articleForm__button} ${style.articleForm__button_delete}`}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={`${style.articleForm__button} ${style.articleForm__button_add}`}
              onClick={() => {
                append({ tag: '' });
              }}
            >
              Add tag
            </button>
          </section>
        </div>
        <button type="submit" className={`${style.articleForm__button} ${style.articleForm__button_submit}`}>
          Send
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.userData.isAuth,
});

export default connect(mapStateToProps)(withRouter(ArticleForm));
