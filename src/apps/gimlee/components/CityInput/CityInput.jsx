import React, { createRef, Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import UIkit from 'uikit';
import { motion } from 'framer-motion';
import api from 'gimlee-ui-service/api';
import { TextInput } from 'gimlee-ui-components/Form';
import Dropdown, { MODE_CLICK } from 'gimlee-ui-components/Dropdown';
import { fetchStatus } from 'gimlee-ui-model/api';
import Overlay, { TYPE_PRIMARY } from 'gimlee-ui-components/Overlay/Overlay';
import Suggestion from './Suggestion';
import styles from './CityInput.scss';
import { cityPropTypes } from '../../routes/ads/AdDetails/model/city';

class CityInput extends PureComponent {

  static getInputValueFromCity(city) {
    if (!city || !city.name) {
      return '';
    }
    const { name, district, adm1 } = city;
    const districtString = district ? `, ${district}` : '';
    return `${name}${districtString}, ${adm1}`;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.defaultCity !== state.currentCity) {
      return {
        ...state,
        currentCity: props.defaultCity,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.handleCitySearchInputChange = this.handleCitySearchInputChange.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.retrieveSuggestions = debounce(this.retrieveSuggestions.bind(this), 300);
    this.renderSuggestions = this.renderSuggestions.bind(this);

    this.citySearchInputRef = createRef();
    this.suggestionsDropdownRef = createRef();

    this.state = {
      suggestionsFetchStatus: { ...fetchStatus },
      citySuggestions: [],
      currentCity: props.defaultCity,
    };
  }

  handleCitySearchInputChange(phrase) {
    UIkit.dropdown(this.suggestionsDropdownRef.current).show();
    if (phrase.length >= 2) {
      this.retrieveSuggestions(phrase);
    }
  }

  retrieveSuggestions(phrase) {
    this.setState({
      suggestionsFetchStatus: { ...fetchStatus, fetching: true },
    });

    api.get(`/api/cities/suggestions?p=${phrase}`).then(result =>
      this.setState({
        citySuggestions: result.data.slice(0, 5),
        suggestionsFetchStatus: { ...fetchStatus, loaded: true },
      }),
    );
  }

  handleSuggestionClick(clickedSuggestion) {
    this.setState({
      currentCity: clickedSuggestion.city,
      citySuggestions: [],
    });

    this.props.onCitySelected(clickedSuggestion.city);

    UIkit.dropdown(this.suggestionsDropdownRef.current).hide(false);
  }

  renderSuggestions() {
    return (
      <motion.ul
        className="uk-list uk-list-divider"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
          },
        }}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {this.state.citySuggestions.map(citySuggestion => (
          <motion.li
            className={styles.suggestionContainer}
            key={citySuggestion.city.id}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 },
            }}
          >
            <Suggestion
              onClick={() => this.handleSuggestionClick(citySuggestion)}
            >
              <strong>
                {citySuggestion.city.name}
                { citySuggestion.city.district.length ? `, ${citySuggestion.city.district}` : '' }
              </strong>
              <small>
                {`${citySuggestion.city.adm2}, ${citySuggestion.city.adm1}`}
              </small>
            </Suggestion>
          </motion.li>
        ))}
      </motion.ul>
    );
  }

  render() {
    return (
      <Fragment>
        <TextInput
          autoComplete="off"
          ref={this.citySearchInputRef}
          id="city"
          key={CityInput.getInputValueFromCity(this.state.currentCity)}
          onChange={inputEvent =>
            this.handleCitySearchInputChange(inputEvent.target.value)}
          defaultValue={CityInput.getInputValueFromCity(this.state.currentCity)}
          placeholder={this.props.placeholder}
        />
        <Dropdown
          className="uk-overflow-auto uk-height-small uk-padding-remove"
          ref={this.suggestionsDropdownRef}
          boundaryElementSelector="#city"
          boundaryAlign
          position="bottom-justify"
          mode={MODE_CLICK}
          toggleElementSelector={false}
        >
          {this.renderSuggestions()}
          {
            this.state.suggestionsFetchStatus.loaded
            && !this.state.citySuggestions.length
            &&
            <Overlay
              type={TYPE_PRIMARY}
              className={
                'uk-position-cover uk-flex uk-flex-center uk-flex-middle ' +
                'uk-animation-fade uk-animation-fast'
              }
            >
              <span className="uk-text-uppercase uk-text-small .uk-text-lighter">
                Nie znaleziono wyników
              </span>
            </Overlay>
          }
        </Dropdown>
      </Fragment>
    );
  }
}

CityInput.propTypes = {
  defaultCity: PropTypes.shape(cityPropTypes),
  onCitySelected: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CityInput.defaultProps = {
  defaultCity: null,
  placeholder: '',
};

export default CityInput;
