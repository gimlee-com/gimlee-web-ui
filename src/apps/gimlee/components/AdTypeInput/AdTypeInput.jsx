import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import RadioSelect from '../RadioSelect';
import {
  AD_TYPE_BUY,
  AD_TYPE_SELL,
  AD_TYPE_LOST,
  AD_TYPE_FOUND,
  AD_TYPE_OTHER,
} from '../../routes/ads/model/adType';

const AdTypeInput = (props) => {
  const { t, currentSelection, onChange } = props;
  return (
    <RadioSelect
      selectedOptionKey={currentSelection}
      options={{
        [null]: t(`app:ads:searchForAdType:${null}`),
        [AD_TYPE_SELL]: t(`app:ads:searchForAdType:${AD_TYPE_SELL}`),
        [AD_TYPE_BUY]: t(`app:ads:searchForAdType:${AD_TYPE_BUY}`),
        [AD_TYPE_LOST]: t(`app:ads:searchForAdType:${AD_TYPE_LOST}`),
        [AD_TYPE_FOUND]: t(`app:ads:searchForAdType:${AD_TYPE_FOUND}`),
        [AD_TYPE_OTHER]: t(`app:ads:searchForAdType:${AD_TYPE_OTHER}`),
      }}
      onChange={onChange}
    />
  );
};

AdTypeInput.propTypes = {
  currentSelection: PropTypes.oneOf([
    null,
    AD_TYPE_BUY,
    AD_TYPE_SELL,
    AD_TYPE_LOST,
    AD_TYPE_FOUND,
    AD_TYPE_OTHER,
  ]),
  onChange: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

AdTypeInput.defaultProps = {
  currentSelection: null,
};

export default translate()(AdTypeInput);
