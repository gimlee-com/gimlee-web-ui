import PropTypes from 'prop-types';
import { stringify } from 'query-string';
import { range } from 'gimlee-ui-model';
import { cityPropTypes } from '../../AdDetails/model/city';

export const pointFilter = Object.freeze({
  x: null,
  y: null,
});

export const pointFilterPropTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export const filtersPropTypes = {
  city: PropTypes.shape(cityPropTypes),
  point: PropTypes.shape(pointFilterPropTypes),
  text: PropTypes.string,
  radius: PropTypes.number,
  type: PropTypes.oneOf([null, 'MASSAGE_SALON', 'CLUB', 'PRIVATE']),
};

const defaultFilters = Object.freeze({
  city: null,
  point: pointFilter,
  radius: null,
  text: null,
  priceRange: range,
  type: null,
});

export const isPointFilterValid = point =>
  point &&
  parseFloat(point.x) >= -180 && parseFloat(point.x) <= 180 &&
  parseFloat(point.y) >= -180 && parseFloat(point.y) <= 180;

export const toQueryString = (filters) => {
  const { point, text, city, radius, priceRange, type } = { ...filters };

  const searchQuery = {};
  if (point) {
    searchQuery.x = point.x;
    searchQuery.y = point.y;
  }
  if (radius) {
    searchQuery.r = radius;
  }
  if (text) {
    searchQuery.t = text;
  }
  if (city) {
    searchQuery.cty = city.id;
  }
  if (priceRange) {
    searchQuery.t60min = priceRange.from;
    searchQuery.t60max = priceRange.to;
  }
  if (type) {
    searchQuery.typ = type;
  }

  return stringify(searchQuery, { skipNull: true });
};

export const isAnyFilterActive = filters => !!toQueryString(filters);

export default defaultFilters;
