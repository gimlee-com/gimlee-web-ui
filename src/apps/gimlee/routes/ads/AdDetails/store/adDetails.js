import api from 'gimlee-ui-service/api';
import { fetchStatus } from 'gimlee-ui-model/api';
import adDetails from '../model/adDetails';

const START_FETCHING_AD_DETAILS = 'ad-details/start-fetching-ad-details';
const SET_AD_DETAILS = 'ad-details/set-ad-details';
const AD_DETAILS_FETCH_ERROR = 'ad-details/ad-details-fetch-error';
const SET_CURRENT_PHOTO_PATH = 'ad-details/set-current-photo-path';

const initialState = {
  data: { ...adDetails },
  currentPhoto: '',
  fetchStatus: { ...fetchStatus },
};

export function fetchAdDetails(adId) {
  return (dispatch) => {
    dispatch({
      type: START_FETCHING_AD_DETAILS,
    });
    api.get(`/api/ads/${adId}`)
      .then((result) => {
        dispatch({
          type: SET_AD_DETAILS,
          payload: result.data,
        });
      }).catch(() => {
        dispatch({
          type: AD_DETAILS_FETCH_ERROR,
        });
      });
  };
}

export function updateCurrentPhoto(photoPath) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PHOTO_PATH,
      payload: photoPath,
    });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_AD_DETAILS:
      return {
        ...initialState,
        fetchStatus: { ...fetchStatus, fetching: true },
      };
    case SET_AD_DETAILS:
      return {
        ...initialState,
        fetchStatus: { ...fetchStatus, loaded: true },
        data: action.payload,
        currentPhoto: action.payload.mediaPaths[0],
      };
    case AD_DETAILS_FETCH_ERROR:
      return {
        ...initialState,
        fetchStatus: { ...fetchStatus, error: 'Could not load ad details' },
      };
    case SET_CURRENT_PHOTO_PATH:
      return {
        ...state,
        currentPhoto: action.payload,
      };
    default:
      return state;
  }
}
