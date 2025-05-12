import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import except from 'except';

import Page from 'gimlee-ui-components/Page';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from 'gimlee-ui-components/_HOC/flexContainer';
import { forAuthorizedOnly, withPropsPassthrough } from 'gimlee-ui-components/_HOC';

import { Div } from 'gimlee-ui-components/_Wrappers';
import { DesktopNav } from './Nav';
import Register from './Auth/Register';
import Login from './Auth/Login/Login';
import Verify from './Auth/Verify';
import NewAdWizard from './ads/NewAd';
import AdDetails from './ads/AdDetails';
import { AdSearch } from './ads/AdSearch';
import Home from './Home';
import RegisterComplete from './Auth/RegisterComplete';
import Footer from './Footer/Footer';
import contentStyles from './DesktopRoutesWithNav.scss';
import routeStyles from './Routes.scss';

const Wrapper = flexContainer()(Div);
const FlexPage = flexContainer()(Page);

const Container = flexContainer()(Div);

const RouteWrapper = props => (
  <Container
    className={contentStyles.routeWrapperContainer}
    flexContainer={{
      wrap: FLEX_NOWRAP,
      direction: FLEX_DIRECTION_COLUMN,
    }}
    {...props.passthrough()}
  >
    {props.children}
  </Container>
);

const RouteWrapperComponent = withPropsPassthrough()(RouteWrapper);

RouteWrapper.propTypes = {
  children: PropTypes.node,
  passthrough: PropTypes.func.isRequired,
};

RouteWrapper.defaultProps = {
  children: null,
};

RouteWrapperComponent.propTypes = except(RouteWrapper.propTypes, 'passthrough');

const routeHeaderTypes = {
  '/': ['landing', false],
};

function getHeaderPropsForRoute({ url }) {
  if (url in routeHeaderTypes) {
    return {
      type: routeHeaderTypes[url][0],
      small: routeHeaderTypes[url][1],
    };
  }
  return {
    type: 'default',
    small: false,
  };
}

const DesktopRoutesWithNav = withRouter(translate()(({ t, location, match }) => (
  <Wrapper
    flexContainer={{ direction: FLEX_DIRECTION_COLUMN }}
    className={contentStyles.container}
  >
    <DesktopNav
      t={t}
      {...getHeaderPropsForRoute(match)}
    />
    <FlexPage
      flexContainer={{
        wrap: FLEX_NOWRAP,
        direction: FLEX_DIRECTION_COLUMN,
      }}
      className={classNames(contentStyles.page)}
      key={`route-${location.pathname}`}
    >
      <AnimatePresence>
        <Switch
          className={routeStyles.routeWrapper}
          location={{ ...location, key: location.pathname }}
          wrapperComponent={RouteWrapperComponent}
          key={location.pathname}
        >
          <Route
            exact
            path="/"
            component={Home}
            key="home"
          />
          <Route
            exact
            path="/register"
            component={Register}
            key="register"
          />
          <Route
            exact
            path="/register/complete"
            component={RegisterComplete}
            key="register-complete"
          />
          <Route
            exact
            path="/login"
            component={Login}
            key="login"
          />
          <Route
            exact
            path="/verify"
            component={Verify}
            key="verify"
          />
          <Route
            exact
            path="/ads"
            component={AdSearch}
            key="ads"
          />
          <Route
            exact
            path="/newAd"
            component={forAuthorizedOnly(['USER'], '/login?resume=/newAd')(NewAdWizard)}
            key="new-ad"
          />
          <Route
            exact
            path="/ad/:id"
            component={AdDetails}
            key="ad"
          />
        </Switch>
      </AnimatePresence>
    </FlexPage>
    <Footer />
  </Wrapper>
)));


export default DesktopRoutesWithNav;
