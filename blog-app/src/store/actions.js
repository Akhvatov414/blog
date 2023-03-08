import { getToken, setToken } from '../services/authAPI';

const url = 'https://blog.kata.academy/api';

const setArtList = (articles, totalCount) => ({
  type: 'setArticles',
  articles,
  totalCount,
});

// const setArticle = (article) => ({
//   type: 'setArticle',
//   article,
// });

const setLogIn = (isAuth) => ({
  type: 'setLogIn',
  isAuth,
});

const setUserData = (username, email, image = null) => ({
  type: 'setUserData',
  userData: { username, email, image },
});

export const regUser = async (username, email, password) => {
  const req = await fetch(`${url}/users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
      },
    }),
  });
  const res = await req.json();
  return res;
};

export const signIn = (email, password) => async (dispatch) => {
  const req = await fetch(`${url}/users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        email,
        password,
      },
    }),
  });
  const res = await req.json();
  if (!res.errors) {
    const {
      user: { username, token, image },
    } = res;
    setToken(token);
    dispatch(setUserData(username, email, image));
    dispatch(setLogIn(true));
  }
  return res;
};

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    const offset = (page - 1) * 20;
    try {
      const token = getToken();
      const req = await fetch(`${url}/articles?offset=${offset}`, {
        headers: {
          Authorization: `Token ${token}`,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      const { articles, articlesCount } = await req.json();
      dispatch(setArtList(articles, articlesCount));
    } catch (e) {
      console.log(e);
    }
  };

export const getArticle = async (slug) => {
  try {
    const token = getToken();
    const req = await fetch(`${url}/articles/${slug}`, {
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
    });
    const { article } = await req.json();
    return { ...article };
    //dispatch(setArticle(article));
  } catch (e) {
    console.log(e);
  }
};
