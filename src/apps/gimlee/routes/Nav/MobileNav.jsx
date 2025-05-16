import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

import position, { POSITION_RELATIVE, POSITION_Z_INDEX_1 } from 'gimlee-ui-components/_HOC/position';
import Navbar, { NavbarActionItem, NavbarLeft, NavbarRight, NavbarRouterLink } from 'gimlee-ui-components/Navbar';
import { RouterButton, TYPE_LINK } from 'gimlee-ui-components/Button';
import Icon, { icons } from 'gimlee-ui-components/Icon';
import ActionLink from 'gimlee-ui-components/ActionLink';
import Dropdown, { MODE_CLICK } from 'gimlee-ui-components/Dropdown';
import animations from 'gimlee-ui-components/constant/animations';
import isLoggedIn from 'gimlee-ui-store/util/isLoggedIn';
import { logout as logoutAction } from 'gimlee-ui-store/loginSession';
import NavbarDropdownNav from 'gimlee-ui-components/Nav/NavbarDropdownNav';
import NavItem from 'gimlee-ui-components/Nav/NavItem';
import DropdownNav from 'gimlee-ui-components/Nav/DropdownNav';
import { mediumPadding, removePadding } from 'gimlee-ui-components/_HOC';
import { Div } from 'gimlee-ui-components/_Wrappers';

import LoginForm, { MODE_COMPACT } from '../Auth/Login/LoginForm';
import styles from './MobileNav.scss';

const NonPaddedDropdown = removePadding()(Dropdown);
const PaddedContainer = mediumPadding()(Div);

const navbarVariants = {
  initial: { opacity: 0, transition: { duration: 0.2 } },
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
const AnimatedNavbarLeft = motion.custom(NavbarLeft);
const AnimatedNavbarRight = motion.custom(NavbarRight);

function renderNavbarLeft(props) {
  const { t } = props; // eslint-disable-line

  return (
    <AnimatedNavbarLeft
      initial="initial"
      animate="enter"
      exit="exit"
      variants={navbarVariants}
      key="navbar-left"
    >
      <NavbarRouterLink to="/" isLogo>
        {t('app:appTitle')}
      </NavbarRouterLink>
    </AnimatedNavbarLeft>
  );
}

function renderNavbarRight(props) {
  const {
    loginSession, logout, t, // eslint-disable-line
  } = props;

  return (
    <AnimatedNavbarRight
      initial="initial"
      animate="enter"
      exit="exit"
      variants={navbarVariants}
      key="navbar-right"
    >
      {isLoggedIn(loginSession) &&
      <div>
        <NavbarActionItem clickAction={() => null}>
          <Icon icon={icons.USER} />&nbsp;
          TODO
        </NavbarActionItem>
        <Dropdown
          position="bottom-right"
          mode={MODE_CLICK}
          animation={animations.SLIDE_TOP_SMALL}
        >
          <NavbarDropdownNav>
            <NavItem>
              <ActionLink clickAction={logout}>{t('logout')}</ActionLink>
            </NavItem>
          </NavbarDropdownNav>
        </Dropdown>
      </div>
      }
      {!isLoggedIn(loginSession) &&
      <div>
        <NavbarActionItem clickAction={() => null}>
          <Icon icon={icons.USER} />
          {t('notLoggedIn')}
        </NavbarActionItem>
        <NonPaddedDropdown
          position="bottom-right"
          offset={-80}
          mode={MODE_CLICK}
          animation={animations.SLIDE_RIGHT_SMALL}
        >
          <PaddedContainer>
            <LoginForm mode={MODE_COMPACT} />
          </PaddedContainer>
          <div className="uk-background-secondary">
            <PaddedContainer>
              <DropdownNav centered>
                <NavItem>
                  {t('noAccountYet')}
                  <RouterButton to="/register" type={TYPE_LINK}>
                    {t('createAccount')}
                  </RouterButton>
                </NavItem>
              </DropdownNav>
            </PaddedContainer>
          </div>
        </NonPaddedDropdown>
      </div>
      }
    </AnimatedNavbarRight>
  );
}

const MobileNav = (props) => {
  const {
    t, loginSession, logout, className, type, customRenderer,
  } = props;

  return (
    <Div className={classNames(
      styles.nav,
      { [styles.primary]: type === 'primary' },
      className,
    )}
    >
      <Navbar className={classNames({ 'uk-light': type === 'primary' })}>
        <AnimatePresence>
          {
            !!customRenderer && customRenderer()
          }
          {
            !customRenderer && [
              renderNavbarLeft({ t }),
              renderNavbarRight(
                { t, loginSession, logout }),
            ]
          }
        </AnimatePresence>
      </Navbar>
    </Div>);
};

MobileNav.propTypes = {
  t: PropTypes.func.isRequired,
  loginSession: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  logout: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['default', 'primary']),
  customRenderer: PropTypes.func,
  className: PropTypes.string,
};

MobileNav.defaultProps = {
  type: 'default',
  customRenderer: null,
  className: null,
};

function mapStateToProps(state) {
  return {
    loginSession: state.loginSession,
    customRenderer: state.customNavRenderers,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutAction()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  compose(
    position({ position: POSITION_RELATIVE }),
    position({ position: POSITION_Z_INDEX_1 }),
  )(MobileNav));
