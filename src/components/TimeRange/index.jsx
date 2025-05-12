import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import {
  flexContainer,
  ALIGN_ITEMS_MIDDLE,
  FLEX_NOWRAP,
  JUSTIFY_CENTER,
} from '../_HOC/flexContainer';
import { Div, Span } from '../_Wrappers';
import { text } from '../_HOC';
import './index.scss';

const FlexContainer = flexContainer()(Div);

const Bold = text({ bold: true })(Span);

const defaultOptions = {
  enableTime: true,
  noCalendar: true,
  dateFormat: 'H:i',
  time_24hr: true,
};

const TimeRange = props => (
  <FlexContainer
    flexContainer={{
      inline: true,
      contentJustify: JUSTIFY_CENTER,
      itemsAlign: ALIGN_ITEMS_MIDDLE,
      wrap: FLEX_NOWRAP,
    }}
  >
    <Flatpickr
      className="uk-input uk-inline uk-margin-small-right"
      options={{
        ...defaultOptions,
        defaultHour: props.defaultHourFrom,
        defaultMinute: props.defaultMinuteFrom,
      }}
      onChange={props.onChangeFrom}
      disabled={props.disabled}
      defaultValue={`${props.defaultHourFrom}:${props.defaultMinuteFrom}`}
      styleName="input"
    />
    <Bold>&ndash;</Bold>
    <Flatpickr
      className="uk-input uk-inline uk-margin-small-left"
      options={{
        ...defaultOptions,
        defaultHour: props.defaultHourTo,
        defaultMinute: props.defaultMinuteTo,
      }}
      onChange={props.onChangeTo}
      disabled={props.disabled}
      defaultValue={`${props.defaultHourTo}:${props.defaultMinuteTo}`}
      styleName="input"
    />
  </FlexContainer>
);

TimeRange.propTypes = {
  onChangeFrom: PropTypes.func.isRequired,
  onChangeTo: PropTypes.func.isRequired,
  defaultHourFrom: PropTypes.number,
  defaultHourTo: PropTypes.number,
  defaultMinuteFrom: PropTypes.number,
  defaultMinuteTo: PropTypes.number,
  disabled: PropTypes.bool,
};

TimeRange.defaultProps = {
  disabled: false,
  defaultHourFrom: 0,
  defaultHourTo: 0,
  defaultMinuteFrom: 0,
  defaultMinuteTo: 0,
};


export default TimeRange;
