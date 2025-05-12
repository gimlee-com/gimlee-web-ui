import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import {routes as appRoutes} from 'gimlee-ui-app'; // eslint-disable-line
import UploadProgress from '../components/Upload/UploadProgress';
import { Div } from '../components/_Wrappers';
import { FLEX_DIRECTION_COLUMN, FLEX_NOWRAP, flexContainer } from '../components/_HOC/flexContainer';
/* @if NODE_ENV!='production' */
import Prototypes from '../_prototypes/routes/Prototypes';
/* @endif */
import styles from './index.scss';

const Wrapper = flexContainer()(Div);

const App = () => (
  <Wrapper
    flexContainer={{
      wrap: FLEX_NOWRAP,
      direction: FLEX_DIRECTION_COLUMN,
    }}
    className={styles.app}
  >
    <UploadProgress />
    { APP_DEV && <Route path="/_prototypes/" component={Prototypes} /> }
    <Route path="/" component={appRoutes} />
  </Wrapper>
);

const AppWithRouter = withRouter(() => <App />);

export default () => <AppWithRouter />;
