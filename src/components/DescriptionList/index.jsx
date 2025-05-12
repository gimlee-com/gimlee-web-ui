import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';

const DescriptionList = (props) => {
  const dividerClass = props.divider ? 'uk-description-list-divider' : '';
  return (
    <dl
      id={props.id}
      className={classNames(`uk-description-list ${dividerClass}`, props.className)}
      {...props.passthrough()}
    >
      { props.children }
    </dl>);
};

DescriptionList.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  divider: PropTypes.bool,
  className: PropTypes.string,
  passthrough: PropTypes.func.isRequired,
};

DescriptionList.defaultProps = {
  id: null,
  children: null,
  divider: false,
  className: null,
};

export default withPropsPassthrough()(DescriptionList);
