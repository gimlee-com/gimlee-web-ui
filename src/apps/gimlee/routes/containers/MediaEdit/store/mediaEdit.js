const SET_CURRENT_IMAGE = 'media-edit/set-image';

const initialState = {
  imageUrl: null,
};

export function setCurrentEditImage(image) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_IMAGE,
      payload: image,
    });
  };
}
export default function reducer(state = initialState, action) {
  if (action.type === SET_CURRENT_IMAGE) {
    return { ...state, imageUrl: action.payload };
  }
  return state;
}
