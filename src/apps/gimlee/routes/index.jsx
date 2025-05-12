import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Div } from 'gimlee-ui-components/_Wrappers';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from 'gimlee-ui-components/_HOC/flexContainer';
import ErrorPage from './ErrorPage';
import ScrollToTop from './ScrollToTop';
/* @if DEVICE = 'desktop' */
import DesktopRoutesWithNav from './DesktopRoutesWithNav';
/* @endif */
/* @if DEVICE = 'mobile' */
import MobileRoutesWithNav from './MobileRoutesWithNav';
/* @endif */
import styles from './index.scss';

const Wrapper = flexContainer()(Div);

function renderDesktopRoutesWithNav() {
  return (<Route
    path="(/|/register|/login|/verify|/events|/newAd|/ad|/ads)"
    component={DesktopRoutesWithNav}
  />);
}

function renderMobileRoutesWithNav() {
  return (<Route
    path="(/|/register|/login|/verify|/events|/newAd|/ad|/ads)"
    component={MobileRoutesWithNav}
  />);
}

const App = () => (
  <Wrapper
    flexContainer={{
      wrap: FLEX_NOWRAP,
      direction: FLEX_DIRECTION_COLUMN,
    }}
    className={styles.app}
  >
    <ScrollToTop />
    <Route path="/error/:code" component={ErrorPage} />
    {
      /* @if DEVICE = 'desktop' */
      renderDesktopRoutesWithNav()
      /* @endif */
    }
    {
      /* @if DEVICE = 'mobile' */
      renderMobileRoutesWithNav()
      /* @endif */
    }
  </Wrapper>
);

const AppWithRouter = withRouter(() => <App />);

export default () => <AppWithRouter />;
