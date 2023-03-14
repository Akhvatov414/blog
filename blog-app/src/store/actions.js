import { getToken, removeToken, setToken } from '../services/authAPI';

const url = 'https://blog.kata.academy/api';

const setArtList = (articles, totalCount) => ({
  type: 'setArticles',
  articles,
  totalCount,
});

const setLoadingStatus = (status) => ({
  type: 'setLoadingStatus',
  status,
});

// const setArticle = (article) => ({
//   type: 'setArticle',
//   article,
// });

export const setLogIn = (status) => ({
  type: 'setLogIn',
  status,
});

export const validateUser = () => async (dispatch) => {
  const token = getToken();
  const req = await fetch(`${url}/user`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  if (req.status === 200) {
    const {
      user: { username, email, token, image },
    } = await req.json();
    setToken(token);
    dispatch(setUserData(username, email, image));
    dispatch(setLogIn(true));
  }
  if (req.status === 401) {
    dispatch(setUserData(null, null, null));
    dispatch(setLogIn(false));
    removeToken();
  }
};

export const editProfile = async (username, email, password, image) => {
  const token = getToken();
  getUserData();
  const req = await fetch(`${url}/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      user: {
        username,
        email,
        password,
        image,
      },
    }),
  });
  const res = await req.json();
  return res;
};

export const setUserData = (username, email, image = null) => ({
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
      dispatch(setLoadingStatus('Loaded'));
    } catch (e) {
      dispatch(setLoadingStatus('Error'));
    }
  };

export const getArticle = async (slug, dispatch) => {
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
    dispatch(setLoadingStatus('Error'));
  }
};

export const deleteArticle = async (slug) => {
  const token = getToken();
  const res = await fetch(`${url}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  return res;
};

export const createArticle = async (title, description, body, tagList) => {
  const token = getToken();
  const res = await fetch(`${url}/articles/`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  return res;
};

export const editArticle = async (title, description, body, tagList, slug) => {
  const token = getToken();
  const res = await fetch(`${url}/articles/${slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      article: {
        title,
        description,
        body,
        tagList,
      },
    }),
  });
  return res;
};

export const getUserData = async () => {
  const token = getToken();
  const req = await fetch('https://blog.kata.academy/api/user', {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const res = await req.json();
  return res;
};

export const setFavorite = async (slug) => {
  const token = getToken();
  const req = await fetch(`${url}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const res = await req.json();
  return res;
};

export const deleteFavorite = async (slug) => {
  const token = getToken();
  const req = await fetch(`${url}/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-type': 'application/json',
    },
  });
  const res = await req.json();
  return res;
};
