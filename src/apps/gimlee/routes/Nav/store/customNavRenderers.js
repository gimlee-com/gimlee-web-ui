const SET_CUSTOM_RENDERERS = 'nav/set-custom-renderers';
const CLEAR_CUSTOM_RENDERERS = 'nav/clear-custom-renderers';

const initialState = {
  left: null,
  center: null,
  right: null,
};

export function setCustomNavRenderers(renderers) {
  return (dispatch) => {
    dispatch({
      type: SET_CUSTOM_RENDERERS,
      payload: renderers,
    });
  };
}

export function clearCustomRenderer() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CUSTOM_RENDERERS,
    });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CUSTOM_RENDERERS:
      return action.payload;
    case CLEAR_CUSTOM_RENDERERS:
      return initialState;
    default:
      return state || initialState;
  }
}
