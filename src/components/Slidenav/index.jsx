import React from 'react';
import PropTypes from 'prop-types';
import Icon, { icons, sizes } from '../Icon';
import withPropsPassthrough from '../_HOC/withPropsPassthrough';
import './Slidenav.scss';

const Slidenav = (props) => {
  const icon = props.mode === 'next' ? icons.NEXT : icons.BACK;
  return (
    <div
      tabIndex="0"
      role="button"
      onClick={props.clickAction}
      styleName="slidenav"
      {...props.passthrough()}
    >
      <Icon icon={icon} size={props.large ? sizes.ICON_LG : sizes.ICON_MD} />
    </div>);
};

Slidenav.propTypes = {
  clickAction: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(['next', 'prev']).isRequired,
  large: PropTypes.bool,
  passthrough: PropTypes.func.isRequired,
};

Slidenav.defaultProps = {
  large: false,
};

export default withPropsPassthrough()(Slidenav);
