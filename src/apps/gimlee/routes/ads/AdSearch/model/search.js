import { parse, stringify } from 'query-string';
import PropTypes from 'prop-types';
import api from 'gimlee-ui-service/api';
import initialFilters, { filtersPropTypes, toQueryString as filtersToQueryString } from './filters';
import initialSorting, { sortingPropTypes } from './sorting';

export const fromQueryString = async query => new Promise((resolve) => {
  const queryParams = parse(query);

  const filters = { ...initialFilters };
  const sorting = { ...initialSorting };

   // Filters
  filters.point = {
    ...initialFilters.point,
    x: queryParams.x ? parseFloat(queryParams.x) : null,
    y: queryParams.y ? parseFloat(queryParams.y) : null,
  };
  filters.radius = queryParams.r ? parseFloat(queryParams.r) : null;
  filters.text = queryParams.t;

  filters.city = queryParams.cty;
  filters.priceRange = {
    from: queryParams.t60min ? parseFloat(queryParams.t60min) : null,
    to: queryParams.t60max ? parseFloat(queryParams.t60max) : null,
  };
  filters.type = queryParams.typ;

   // Sorting
  sorting.by = queryParams.by;
  sorting.direction = queryParams.dir;

   // Page
  const page = queryParams.p ? parseInt(queryParams.p, 10) : 0;

  if (queryParams.cty) {
    api.get(`/api/cities/${queryParams.cty}`).then((result) => {
      filters.city = result.data;
      resolve({ filters, sorting, page });
    }).catch(() => {
      resolve({ filters, sorting, page });
    });
  } else {
    resolve({ filters, sorting, page });
  }
});

export const toQueryString = (search) => {
  const { filters, sorting, page } = { ...search };
  const searchQuery = {};

  // Sorting
  const { by, direction } = { ...sorting };
  searchQuery.by = by;
  searchQuery.dir = direction;

  // Page
  searchQuery.p = page || 0;

  const searchQueryString = stringify(
    {
      ...searchQuery,
      ...parse(filtersToQueryString(filters)),
    },
    { skipNull: true });
  return searchQueryString;
};

export const searchPropTypes = {
  filters: PropTypes.shape(filtersPropTypes),
  sorting: PropTypes.shape(sortingPropTypes),
  page: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Object.freeze({
  filters: { ...initialFilters },
  sorting: { ...initialSorting },
  page: 0,
});
