import { fetchStatus } from 'gimlee-ui-model/api';
import api from 'gimlee-ui-service/api';
import adData from '../model/adData';
import initialSearch, { toQueryString } from '../model/search';

const START_FETCHING_ADS = 'ad-search/start-fetching-ads';
const SET_ADS = 'ad-search/set-ads';
const ADS_FETCH_ERROR = 'ad-search/ads-fetch-error';
const SET_SEARCH = 'ad-search/set-search';

const initialState = {
  data: { ...adData },
  search: { ...initialSearch },
  searchCriteriaChanged: false,
  fetchStatus: { ...fetchStatus },
};

export function fetchAds(search) {
  return (dispatch) => {
    dispatch({
      type: START_FETCHING_ADS,
    });
    api.get(`/api/ads/?${toQueryString(search)}`)
      .then((result) => {
        dispatch({
          type: SET_ADS,
          payload: result.data,
        });
      })
      .catch(() => {
        dispatch({ type: ADS_FETCH_ERROR });
      });
  };
}

export function setSearch(search) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: search,
    });
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_ADS:
      return {
        ...state,
        fetchStatus: { ...fetchStatus, fetching: true },
        searchCriteriaChanged: false,
      };
    case SET_ADS:
      return {
        ...state,
        fetchStatus: { ...fetchStatus, loaded: true },
        data: action.payload,
      };
    case ADS_FETCH_ERROR:
      return {
        ...state,
        fetchStatus: { ...fetchStatus, error: 'Could not load ads' },
      };
    case SET_SEARCH:
      return {
        ...initialState,
        search: action.payload,
        searchCriteriaChanged: true,
      };
    default:
      return state;
  }
}
