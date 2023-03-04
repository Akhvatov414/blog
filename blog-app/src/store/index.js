import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import articlesReducer from './reducers/articlesReducer';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const reducerList = combineReducers({
  articles: articlesReducer,
});

const store = createStore(reducerList, composeEnhancers(applyMiddleware(thunk)));

export default store;
