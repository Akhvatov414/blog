const url = 'https://blog.kata.academy/api';

const getArticles = async (page = 1) => {
    const offset = (page - 1) * 20;
    try {
      const req = await fetch(`${url}/articles?offset=${offset}`, {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      const { articles, articlesCount } = await req.json();
    } catch (e) {
      console.log(e);
    }
};