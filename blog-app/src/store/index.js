import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import articleReducer from './reducers/articleReducer';
import articlesReducer from './reducers/articlesReducer';
import loadingReducer from './reducers/loadingReducer';
import loginReducer from './reducers/loginReducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const reducerList = combineReducers({
  articles: articlesReducer,
  article: articleReducer,
  userData: loginReducer,
  isLoading: loadingReducer,
});

const store = createStore(reducerList, composeEnhancers(applyMiddleware(thunk)));

export default store;
