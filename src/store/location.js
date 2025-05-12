import locationEntry from '../store/model/locationEntry';

export const ADD_COORDINATES = 'location/add-coordinates';

const LOCATION_HISTORY_SIZE = 25;

const locationState = {
  recentLocations: [],
};

const initialState = { ...locationState };

export function addCoordinates(coordinates) {
  return (dispatch) => {
    dispatch({
      type: ADD_COORDINATES,
      payload: coordinates,
    });
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case ADD_COORDINATES: {
      const locations = state.recentLocations.length >= LOCATION_HISTORY_SIZE ?
        state.recentLocations.slice(1, LOCATION_HISTORY_SIZE - 1) : [...state.recentLocations];
      locations.push({
        ...locationEntry,
        ...action.payload,
        timestamp: Date.now(),
      });
      return {
        ...state,
        recentLocations: locations,
      };
    }
    default:
      return state || initialState;
  }
}
