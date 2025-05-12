import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import reducers from './reducers';

export const history = createHistory();

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk, routerMiddleware(history)),
      // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && APP_DEV && window.__REDUX_DEVTOOLS_EXTENSION__(),
    window.devToolsExtension && APP_DEV ? window.devToolsExtension() : f => f,
  ),
);
