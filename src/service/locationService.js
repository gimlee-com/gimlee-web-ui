import { duration } from 'moment';
import { coordinates } from '../store/model';
import { addCoordinates } from '../store/location';

function addLocation(store, position) {
  const { latitude, longitude, accuracy } = position.coords;

  addCoordinates({
    ...coordinates,
    latitude,
    longitude,
    accuracy,
  })(store.dispatch);
}

function geolocationError(error) {
  console.error(error);
}

export default (store) => {
  const options = {
    enableHighAccuracy: true,
    timeout: duration(60, 'seconds').asMilliseconds(),
    maximumAge: duration(10, 'minutes').asMilliseconds(),
  };
  navigator.geolocation.watchPosition(
    position => addLocation(store, position), geolocationError, options);
  setInterval(() =>
    navigator.geolocation.getCurrentPosition(
      position => addLocation(store, position), geolocationError, options)
  , duration(60, 'seconds').asMilliseconds());
};
