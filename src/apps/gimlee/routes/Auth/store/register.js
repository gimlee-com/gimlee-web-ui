import { fetchStatus } from 'gimlee-ui-model/api';
import api from 'gimlee-ui-service/api';

const REGISTER_START = 'register/register-start';
const REGISTER_COMPLETE = 'register/register-complete';
const REGISTER_ERROR = 'register/register-error';

const registerState = {
  registerStatus: { ...fetchStatus },
  username: null,
  email: null,
  password: null,
};

const initialState = { ...registerState };

function processRegisterResponse(dispatch) {
  dispatch({
    type: REGISTER_COMPLETE,
  });
}

function processRegisterError(dispatch) {
  dispatch({
    type: REGISTER_ERROR,
  });
}

export const register = (username, email, password) => (
  (dispatch) => {
    dispatch({
      type: REGISTER_START,
      payload: {
        username,
        email,
        password,
      },
    });
    api.post('/api/auth/register', { username, email, password }).then(() => {
      processRegisterResponse(dispatch);
    }).catch(() => {
      processRegisterError(dispatch);
    });
  });

export default function reducer(state, action) {
  switch (action.type) {
    case REGISTER_START:
      return {
        ...initialState,
        ...action.payload,
        registerStatus: { ...fetchStatus, fetching: true },
      };
    case REGISTER_COMPLETE:
      return {
        ...state,
        registerStatus: { ...fetchStatus, loaded: true },
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerStatus: { ...fetchStatus, error: action.error },
      };
    default:
      return state || initialState;
  }
}
