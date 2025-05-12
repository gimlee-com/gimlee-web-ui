import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import except from 'except';
import { AnimatePresence } from 'framer-motion';

import Page from 'gimlee-ui-components/Page';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from 'gimlee-ui-components/_HOC/flexContainer';
import { withPropsPassthrough } from 'gimlee-ui-components/_HOC';

import { Div } from 'gimlee-ui-components/_Wrappers';
import { MobileNav } from './Nav';
import Register from './Auth/Register';
import Login from './Auth/Login/Login';
import Home from './Home';
import RegisterComplete from './Auth/RegisterComplete';
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

const MobileRoutesWithNav = withRouter(translate()(({ t, location }) => (
  <Wrapper flexContainer={{ direction: FLEX_DIRECTION_COLUMN }} className={contentStyles.container}>
    <MobileNav
      t={t}
      className={contentStyles.header}
      type={location.pathname.indexOf('/events/') >= 0 ? 'primary' : 'default'}
    />
    <FlexPage
      flexContainer={{
        wrap: FLEX_NOWRAP,
        direction: FLEX_DIRECTION_COLUMN,
      }}
      className={contentStyles.page}
    >
      <AnimatePresence>
        <Switch
          className={routeStyles.routeWrapper}
          location={{ ...location, key: location.pathname }}
          key={location.pathname}
          wrapperComponent={RouteWrapperComponent}
        >
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/register/complete" component={RegisterComplete} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </AnimatePresence>
    </FlexPage>
  </Wrapper>
)));


export default MobileRoutesWithNav;
