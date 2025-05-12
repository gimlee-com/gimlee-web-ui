import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { translate } from 'react-i18next';
import { Grid } from '../Grid';
import { FLEX_WRAP, flexContainer } from '../_HOC/flexContainer';
import { equalFractionChildWidths } from '../_HOC';
import {
  VIEWPORT_LARGE,
  VIEWPORT_MEDIUM,
} from '../_HOC/constant/viewport-size-css-suffix';

const ItemsGrid = compose(
  equalFractionChildWidths(1, 4, VIEWPORT_LARGE),
  equalFractionChildWidths(1, 3, VIEWPORT_MEDIUM),
  flexContainer(),
)(Grid);

const MediaGrid = props => (
  <div>
    <ItemsGrid
      small
      flexContainer={{
        wrap: FLEX_WRAP,
      }}
    >
      {props.children}
    </ItemsGrid>
  </div>
);

MediaGrid.propTypes = {
  children: PropTypes.node,
};

MediaGrid.defaultProps = {
  children: null,
};

export default translate()(MediaGrid);
