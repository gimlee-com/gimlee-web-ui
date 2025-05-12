import React, { Fragment, useState, useEffect } from 'react'; // Import useState and useEffect
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import position, { POSITION_RELATIVE, POSITION_Z_INDEX_1 } from 'gimlee-ui-components/_HOC/position';
import { TYPE_PRIMARY, TYPE_LINK } from 'gimlee-ui-components/Button';
import Navbar, { NavbarCenter, NavbarLeft, NavbarRight, NavbarRouterLink } from 'gimlee-ui-components/Navbar';
import Icon, { icons } from 'gimlee-ui-components/Icon';
import Sticky from 'gimlee-ui-components/Sticky';
import animations from 'gimlee-ui-components/constant/animations';

import isLoggedIn from 'gimlee-ui-store/util/isLoggedIn';
import { Div } from 'gimlee-ui-components/_Wrappers';
import Logo from './components/Logo';
import styles from './DesktopNav.scss';
import NotLoggedInMenu from './components/Profile/NotLoggedInMenu';
import ProfileMenu from './components/Profile/ProfileMenu';

const DesktopNav = (props) => {
  const {
    t, loginSession, className, type, customNavRenderers,
  } = props;

  const [scrolled, setScrolled] = useState(false); // Initialize scrolled state

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 65) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true }); // Added passive for performance
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const newAdButtonType = scrolled ? TYPE_LINK : TYPE_PRIMARY;

  return (
    <Sticky
      clsActive="uk-navbar-sticky"
      clsInactive="uk-navbar-transparent"
      animation={animations.SLIDE_TOP}
    >
      <Navbar
        className={classNames(
                styles.nav,
                { [styles.landing]: type === 'landing' },
                className,
            )}
      >
        <div className="uk-container uk-container-expand uk-flex uk-flex-1">
          <NavbarLeft className="uk-flex-nowrap">
            { !!customNavRenderers.left && customNavRenderers.left()}
            { !customNavRenderers.left && <Logo type={type} /> }
          </NavbarLeft>
          <NavbarCenter>
            { !!customNavRenderers.center && customNavRenderers.center() }
          </NavbarCenter>
          <NavbarRight className="uk-flex-nowrap">
            { !!customNavRenderers.right && customNavRenderers.right() }
            { !customNavRenderers.right &&
              <Fragment>
                <Div>
                  <NavbarRouterLink to="/newAd" type={newAdButtonType}>
                    <Icon icon={icons.ADD} />&nbsp;
                    {t('app:nav:newAd')}
                  </NavbarRouterLink>
                </Div>
                {isLoggedIn(loginSession) && <ProfileMenu />}
                { !isLoggedIn(loginSession) && <NotLoggedInMenu />}
              </Fragment>
              }
          </NavbarRight>
        </div>
      </Navbar>
    </Sticky>
  );
};

DesktopNav.propTypes = {
  t: PropTypes.func.isRequired,
  loginSession: PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  customNavRenderers: PropTypes.shape({
    left: PropTypes.func,
    center: PropTypes.func,
    right: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['default', 'landing']),
};

DesktopNav.defaultProps = {
  className: null,
  type: 'default',
};

function mapStateToProps(state) {
  return {
    loginSession: state.loginSession,
    customNavRenderers: state.customNavRenderers,
  };
}

export default connect(mapStateToProps)(
    compose(
        position({ position: POSITION_RELATIVE }),
        position({ position: POSITION_Z_INDEX_1 }),
    )(DesktopNav));
