import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { toStringHDMS } from 'ol/coordinate';
import { Grid, GridItem, GUTTER_SMALL } from 'gimlee-ui-components/Grid';
import Badge from 'gimlee-ui-components/Badge';
import Close from 'gimlee-ui-components/Close';
import { filters as defaultFilters, filtersPropTypes } from '../../model';
import { isAnyFilterActive, isPointFilterValid } from '../../model/filters';

class SelectedFiltersContainer extends PureComponent {

  constructor(props) {
    super(props);

    this.renderSelectedFilter = this.renderSelectedFilter.bind(this);
    this.removeFilters = this.removeFilters.bind(this);
    this.renderSelectedPriceRange = this.renderSelectedPriceRange.bind(this);
  }

  removeFilters(filters, filterKeys) {
    let newFilters;
    if (!Array.isArray(filterKeys)) {
      newFilters = {
        ...this.props.filters,
        [filterKeys]: defaultFilters[filterKeys],
      };
    } else {
      newFilters = { ...this.props.filters };
      filterKeys.forEach((filterKey) => {
        newFilters = {
          ...newFilters,
          [filterKey]: defaultFilters[filterKey],
        };
      });
    }

    this.props.onFiltersUpdate(newFilters);
  }

  renderSelectedPriceRange(minPrice, maxPrice) {
    const { t } = this.props;
    if (minPrice && maxPrice) {
      return this.renderSelectedFilter(
        null,
        t('app:ads:searchByPriceFromTo', { minPrice, maxPrice, currencyUnit: t('currencies:PLN') }),
        'priceRange',
      );
    } else if (minPrice) {
      return this.renderSelectedFilter(
        null,
        t('app:ads:searchByPriceFrom', { minPrice, currencyUnit: t('currencies:PLN') }),
        'priceRange',
      );
    }
    return this.renderSelectedFilter(
      null,
      t('app:ads:searchByPriceTo', { maxPrice, currencyUnit: t('currencies:PLN') }),
      'priceRange',
    );
  }

  renderSelectedFilter(label, text, filterKeys) {
    return (
      <GridItem key={`${filterKeys}${text}`}>
        <Badge className="uk-padding-small uk-light">
          {label && <span className="uk-text-muted">{label}:&nbsp;</span>}
          {text && <strong>{text}</strong>}
          { filterKeys &&
            <Close
              className="uk-margin-small-left"
              onClick={() => this.removeFilters(this.props.filters, filterKeys)}
            />
          }
        </Badge>
      </GridItem>
    );
  }

  render() {
    const { t, filters } = this.props;
    return (
      <Grid gutter={GUTTER_SMALL}>
        <GridItem>
          <strong className="uk-text-uppercase uk-text-muted uk-text-light">
            <small>{t('app:ads:currentSearch')}</small>
          </strong>
        </GridItem>
        { !isAnyFilterActive(filters) && this.renderSelectedFilter(null, t('app:ads:displayingAll')) }
        { filters.type && this.renderSelectedFilter(null, t(`app:ads:searchForAdType:${filters.type}`), 'type') }
        { filters.text && this.renderSelectedFilter(t('app:ads:searchPhrase'), filters.text, 'text') }
        { filters.city && filters.city.name && this.renderSelectedFilter(t('app:ads:city'), filters.city.name, ['city', 'point', 'radius']) }
        {
          (!filters.city || !filters.city.name) &&
            isPointFilterValid(filters.point) &&
            filters.radius &&
            this.renderSelectedFilter(
              t('app:ads:location'),
              t('app:ads:withinDistanceFromPoint',
                {
                  distance: `${filters.radius} km`,
                  pointDMS: toStringHDMS(
                    [parseFloat(filters.point.x), parseFloat(filters.point.y)],
                  ),
                }),
              ['city', 'point', 'radius'],
            )
        }
        {
          filters.priceRange && (filters.priceRange.from || filters.priceRange.to) &&
          this.renderSelectedPriceRange(filters.priceRange.from, filters.priceRange.to)
        }
      </Grid>
    );
  }
}

SelectedFiltersContainer.propTypes = {
  filters: PropTypes.shape(filtersPropTypes).isRequired,
  onFiltersUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    filters: state.adSearch.search.filters,
  };
}

export default connect(mapStateToProps)(translate()(withRouter(SelectedFiltersContainer)));
