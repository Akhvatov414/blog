const initialState = {
    articles: [],
    countArticles: 1,
};

const articlesReducer = (state = initialState, action = {}) => {
    const SET_ARTICLES = 'setArticles';
    switch(action.type) {
        case SET_ARTICLES:
            return { ...state, articles: action.articles, countArticles: action.total };
        default:
            return state;
    }
};

export default articlesReducer;