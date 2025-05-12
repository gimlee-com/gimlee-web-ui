import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UIkit from 'uikit';
import { ARROW_DOWN } from 'gimlee-ui-components/Icon/icons';
import { ICON_XS } from 'gimlee-ui-components/Icon/sizes';
import { Radio, Label } from 'gimlee-ui-components/Form';
import Icon from 'gimlee-ui-components/Icon';

class RadioSelect extends PureComponent {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(value) {
    if (value === 'null') {
      this.props.onChange(null);
    } else {
      this.props.onChange(value);
    }
  }

  render() {
    const { options } = this.props;
    const selectedOptionKey = String(this.props.selectedOptionKey);

    return (
      <Fragment>
        <div className="uk-flex uk-flex-inline">
          <button
            className="uk-input uk-flex-1 uk-text-nowrap"
            type="button"
          >
            {options[selectedOptionKey]}
          </button>
          <button className="uk-input" type="button">
            <Icon icon={ARROW_DOWN} size={ICON_XS} />
          </button>
        </div>
        <div uk-dropdown="mode: click; boundary: ! .uk-button-group; boundary-align: true;">
          <ul className="uk-nav uk-dropdown-nav">
            {Object.keys(options)
              .map(optionKey => (
                <li
                  key={optionKey}
                  className={classNames({ 'uk-active': selectedOptionKey === optionKey })}
                >
                  <Label for={`radio-${optionKey}`}>
                    <Radio
                      id={`radio-${optionKey}`}
                      name="gender"
                      value={options[optionKey]}
                      checked={selectedOptionKey === optionKey}
                      onChange={() => this.handleOnChange(optionKey)}
                    />
                    <span className="uk-margin-small-left">{options[optionKey]}</span>
                  </Label>
                </li>
              ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}

RadioSelect.propTypes = {
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  selectedOptionKey: PropTypes.oneOfType(PropTypes.string),
  onChange: PropTypes.func,
};

RadioSelect.defaultProps = {
  onChange: UIkit.util.noop,
  selectedOptionKey: null,
};

export default RadioSelect;
