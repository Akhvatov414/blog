const initialState = {
  article: [],
};

const articleReducer = (state = initialState, action = {}) => {
  const SET_ARTICLE = 'setArticle';
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, article: action.article };
    default:
      return state;
  }
};

export default articleReducer;
