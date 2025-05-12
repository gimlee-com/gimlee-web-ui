import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './service/i18n';
import store, { history } from './store';
import getRoutes from './routes';
import locationService from './service/locationService';
import { ViewportWidthProvider } from './components/_HOC/viewportWidthAware';
/* eslint-disable */
import './styles//* @echo BRAND *//global.scss';
import {initLoginSession} from "gimlee-ui-store/loginSession";
/* eslint-enable */

const APP_TARGET_NODE_ID = 'app';

render(
  <ViewportWidthProvider>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          { getRoutes() }
        </ConnectedRouter>
      </Provider>
    </I18nextProvider>
  </ViewportWidthProvider>,
  document.getElementById(APP_TARGET_NODE_ID),
);

initLoginSession(store.dispatch);
locationService(store);
