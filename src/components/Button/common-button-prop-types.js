import PropTypes from 'prop-types';
import {
  SIZE_LARGE, SIZE_SMALL, TYPE_DANGER, TYPE_DEFAULT, TYPE_LINK, TYPE_PRIMARY, TYPE_SECONDARY,
  TYPE_TEXT,
} from './constants';

export const commonButtonPropTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf([
    TYPE_DEFAULT, TYPE_PRIMARY, TYPE_SECONDARY, TYPE_LINK, TYPE_DANGER, TYPE_TEXT,
  ]),
  size: PropTypes.oneOf([SIZE_LARGE, SIZE_SMALL]),
  children: PropTypes.node,
};

export const commonButtonDefaultProps = {
  id: null,
  type: TYPE_DEFAULT,
  size: null,
  children: null,
};
