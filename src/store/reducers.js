import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducers as appReducers } from 'gimlee-ui-app'; // eslint-disable-line
import locale from './locale';
import location from './location';
import loginSession from './loginSession';
import uploadProgress from './uploadProgress';
import chats from './chats';

export default combineReducers({
  appInitTimestamp(state) { return state || Date.now(); },
  loginSession,
  locale,
  location,
  uploadProgress,
  chats,
  ...appReducers,
  router: routerReducer,
});
