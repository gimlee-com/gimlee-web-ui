import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

export const DEFAULT = 'default';
export const PRIMARY = 'primary';
export const SECONDARY = 'secondary';

export const CARD_SMALL = 'small';
export const CARD_MEDIUM = 'medium';
export const CARD_LARGE = 'large';

const Card = (props) => {
  const className = classNames(
    'uk-card',
    `uk-card-${props.type}`,
    `uk-card-${props.size}`,
    { 'uk-card-body': props.bodyPadding },
    props.className,
  );
  return (
    <div className={className} {...props.passthrough()}>
      { props.title && (<h3 className="uk-card-title">{props.title}</h3>) }
      { props.children }
    </div>);
};

Card.propTypes = {
  bodyPadding: PropTypes.bool,
  title: PropTypes.node,
  type: PropTypes.oneOf([DEFAULT, PRIMARY, SECONDARY]),
  size: PropTypes.oneOf([CARD_SMALL, CARD_MEDIUM, CARD_LARGE]),
  children: PropTypes.node,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Card.defaultProps = {
  id: null,
  bodyPadding: false,
  title: null,
  type: DEFAULT,
  size: CARD_MEDIUM,
  children: null,
  className: null,
};

export default withPropsPassthrough()(Card);
