import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const GUTTER_SMALL = 'gutter-small';
export const GUTTER_MEDIUM = 'gutter-medium';
export const GUTTER_LARGE = 'gutter-large';
export const GUTTER_NONE = 'gutter-none';
export const GUTTER_DEFAULT = 'gutter-default';

const Grid = (props) => {
  const className = classNames(
    {
      'uk-grid-small': props.gutter === GUTTER_SMALL,
      'uk-grid-medium': props.gutter === GUTTER_MEDIUM,
      'uk-grid-large': props.gutter === GUTTER_LARGE,
      'uk-grid-collapse': props.gutter === GUTTER_NONE,
      'uk-grid-divider': props.divider,
    },
    // multiline grids done with flex == potential source of nasty bugs (do at your own risk)
    { 'uk-flex-nowrap': props.nowrap },
    props.className,
  );
  return (
    <div className={className} uk-grid="" {...props.passthrough()}>
      {props.children}
    </div>
  );
};

Grid.propTypes = {
  gutter: PropTypes.oneOf([
    GUTTER_LARGE,
    GUTTER_MEDIUM,
    GUTTER_SMALL,
    GUTTER_NONE,
    GUTTER_DEFAULT,
  ]),
  nowrap: PropTypes.bool,
  children: PropTypes.node,
  divider: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Grid.defaultProps = {
  gutter: GUTTER_DEFAULT,
  nowrap: true,
  children: null,
  divider: false,
  className: null,
};

export default withPropsPassthrough()(Grid);
