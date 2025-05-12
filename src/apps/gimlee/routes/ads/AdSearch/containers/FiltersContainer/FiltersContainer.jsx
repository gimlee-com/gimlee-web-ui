import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'gimlee-ui-components/Icon/Icon';
import { SEARCH } from 'gimlee-ui-components/Icon/icons';
import { Form } from 'gimlee-ui-components/Form';
import { ActionButton, TYPE_PRIMARY } from 'gimlee-ui-components/Button';
import { Grid, GridItem, GUTTER_SMALL } from 'gimlee-ui-components/Grid';
import { fetchAds, setSearch } from '../../store/adSearch';
import SelectedFiltersContainer from './SelectedFiltersContainer';
import { searchPropTypes, toQueryString } from '../../model/search';
import AdTypeInput from '../../../../../components/AdTypeInput';
import CityInput from '../../../../../components/CityInput/CityInput';

class FiltersContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.applyFilters = this.applyFilters.bind(this);
  }

  applyFilters(filters) {
    const newSearch = {
      ...this.props.search,
      filters,
    };
    this.props.history.push(`/ads?${toQueryString(newSearch)}`);
  }

  render() {
    const { t, search } = this.props;
    const { filters } = search;
    return (
      <div>
        <Form onSubmit={this.onSubmit} className="uk-form-horizontal">
          <Grid gutter={GUTTER_SMALL}>
            <GridItem className="uk-flex uk-flex-inline uk-flex-middle">
              <span>
                <strong
                  className="uk-text-uppercase"
                ><small>{t('app:ads:searchForAds')}</small></strong>
              </span>
            </GridItem>
            <GridItem className="uk-flex-inline">
              <div>
                <AdTypeInput
                  currentSelection={filters.type}
                  onChange={selection => this.applyFilters({
                    ...filters,
                    type: selection,
                  })}
                />
              </div>
              <div className="uk-width-large">
                <CityInput
                  defaultCity={filters.city}
                  onCitySelected={city => this.applyFilters({
                    ...filters,
                    city,
                  })}
                  placeholder={t('app:ads:enterCityOrSelectOnMap')}
                />
              </div>
              <div>
                <ActionButton type={TYPE_PRIMARY} className="uk-input">
                  <Icon icon={SEARCH} />
                </ActionButton>
              </div>
            </GridItem>
          </Grid>
          <Grid>
            <GridItem className="uk-flex uk-flex-inline uk-flex-middle">
              <SelectedFiltersContainer onFiltersUpdate={this.applyFilters} />
            </GridItem>
          </Grid>
        </Form>
      </div>
    );
  }
}

FiltersContainer.propTypes = {
  search: PropTypes.shape(searchPropTypes).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    search: state.adSearch.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearch: search => dispatch(setSearch(search)),
    fetchAds: search => dispatch(fetchAds(search)),
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps,
)(translate()(withRouter(FiltersContainer)));
