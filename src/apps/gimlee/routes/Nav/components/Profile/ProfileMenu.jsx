import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { NavbarActionItem } from 'gimlee-ui-components/Navbar';
import Icon, { icons } from 'gimlee-ui-components/Icon';
import Dropdown, { MODE_CLICK } from 'gimlee-ui-components/Dropdown';
import animations from 'gimlee-ui-components/constant/animations';
import NavbarDropdownNav from 'gimlee-ui-components/Nav/NavbarDropdownNav';
import NavItem from 'gimlee-ui-components/Nav/NavItem';
import ActionLink from 'gimlee-ui-components/ActionLink';
import { Div } from 'gimlee-ui-components/_Wrappers';
import { logout as logoutAction } from 'gimlee-ui-store/loginSession';

class ProfileMenu extends PureComponent {
  render() {
    const { loginSession, logout, t } = this.props;

    return (
      <Div>
        <NavbarActionItem clickAction={() => null}>
          <Icon icon={icons.USER} />&nbsp;
          {loginSession.user.username}
        </NavbarActionItem>
        <Dropdown
          position="bottom-right"
          mode={MODE_CLICK}
          animation={animations.SLIDE_TOP_SMALL}
        >
          <NavbarDropdownNav className="">
            <NavItem>
              <ActionLink clickAction={logout}>{t('logout')}</ActionLink>
            </NavItem>
          </NavbarDropdownNav>
        </Dropdown>
      </Div>
    );
  }
}

ProfileMenu.propTypes = {
  loginSession: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  logout: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loginSession: state.loginSession,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(ProfileMenu));
