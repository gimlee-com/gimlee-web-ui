import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as icons from './icons';
import * as sizes from './sizes';
import './icon.font';
import './Icon.scss';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const Icon = (props) => {
  const className = classNames('q-icon', `q-icon-${props.icon}`, props.className);
  return (<span className={className} styleName={props.size} {...props.passthrough()} />);
};

Icon.propTypes = {
  size: PropTypes.oneOf(Object.keys(sizes).map(i => sizes[i])),
  icon: PropTypes.oneOf(Object.keys(icons).map(i => icons[i])).isRequired,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

Icon.defaultProps = {
  size: sizes.ICON_SM,
  className: null,
};

export default withPropsPassthrough()(Icon);
