import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import PageContent from 'gimlee-ui-components/PageContent';
import Container from 'gimlee-ui-components/Container';

const ErrorPage = props => (
  <PageContent>
    <Container>
      <h1>{props.match.params.code}</h1>
      <p className="uk-text-large">{props.t(`errors:${props.match.params.code}`)}</p>
    </Container>
  </PageContent>);

ErrorPage.propTypes = {
  t: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      code: PropTypes.oneOf(['401', '403', '404', '500']).isRequired,
    }).isRequired,
  }).isRequired,
};

export default translate()(ErrorPage);
