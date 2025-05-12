import jwtDecode from 'jwt-decode';
import cookies from 'js-cookie';
import isLoggedIn from 'gimlee-ui-store/util/isLoggedIn';
import { fetchStatus } from '../model/api';
import api from '../service/api';
import { loginSession } from './model';
import jwtDataToLoginSession from './converter/jwtDataToLoginSession';

const LOGIN_START = 'login-session/login-start';
const LOGIN_UPDATE = 'login-session/update';
const LOGIN_ERROR = 'login-session/login-error';
const LOGOUT = 'login-session/logout';

const initialState = { ...loginSession };

export function updateAccessToken(accessToken, dispatch) {
  dispatch({
    type: LOGIN_UPDATE,
    payload: jwtDataToLoginSession(jwtDecode(accessToken)),
  });
}

export function updateLoginSession(accessToken, csrfToken, dispatch) {
  const jwtData = jwtDecode(accessToken);
  const loginSessionState = jwtDataToLoginSession(jwtData);
  if (isLoggedIn(loginSessionState)) {
    dispatch({
      type: LOGIN_UPDATE,
      payload: {
        ...loginSessionState,
        csrfToken,
      },
    });
  }
}

function processLoginError(error, dispatch) {
  dispatch({
    type: LOGIN_ERROR,
    error,
  });
}

export function initLoginSession(dispatch) {
  api.get('/api/auth/session/init').then((response) => {
    updateLoginSession(response.data.accessToken, response.data.csrfToken, dispatch);
  });
}

export function login(username, password, rememberLogin) {
  return (dispatch) => {
    dispatch({
      type: LOGIN_START,
    });
    api.post('/api/auth/login', { username, password, rememberLogin }).then((response) => {
      updateLoginSession(response.data.accessToken, response.data.csrfToken, dispatch);
    }).catch((error) => {
      processLoginError(error, dispatch);
    });
  };
}

export function logout() {
  return (dispatch) => {
    api.post('/api/auth/logout').then(() => {
      cookies.remove('JWT');
      dispatch({
        type: LOGOUT,
      });
    });
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...initialState,
        fetchStatus: { ...fetchStatus, fetching: true },
      };
    case LOGIN_UPDATE:
      return {
        ...state,
        ...action.payload,
        fetchStatus: { ...fetchStatus, loaded: true },
      };
    case LOGIN_ERROR:
      return {
        ...initialState,
        fetchStatus: { ...fetchStatus, error: action.error },
      };
    case LOGOUT:
      return initialState;
    default:
      return state || initialState;
  }
}
