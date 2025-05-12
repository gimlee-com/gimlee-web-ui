import React from 'react';
import Alert, { ALERT_PRIMARY } from 'gimlee-ui-components/Alert';

const renderNewAdAlert = t => (
  <Alert className="uk-width-1-1" type={ALERT_PRIMARY}>
    { t('app:auth:login:newAdInfo') }
  </Alert>
);

export const renderInfoAlert = (t, resumePath) => {
  switch (resumePath) {
    case '/newAd': return renderNewAdAlert(t);
    default: return null;
  }
};
