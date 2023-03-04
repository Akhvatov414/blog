const url = 'https://blog.kata.academy/api';

const setArtList = (articles, totalCount) => ({
  type: 'setArticles',
  articles,
  totalCount,
});

export const getArticles =
  (page = 1) =>
  async (dispatch) => {
    const offset = (page - 1) * 20;
    try {
      const req = await fetch(`${url}/articles?offset=${offset}`, {
        headers: {
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
